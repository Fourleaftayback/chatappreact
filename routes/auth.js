const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Busboy = require("busboy");
const keys = process.env.secret;

const validateRegisterInput = require("../validation/userRegisterValidation");
const validateLoginInput = require("../validation/loginValidation");

const uploadToS3 = require("../aws/s3bucket");

// @route   POST /user/register
// @desc    user registration
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);
  User.findOne({
    $or: [
      {
        email: req.body.email
      },
      {
        user_name: req.body.user_name
      }
    ]
  }).exec((err, user) => {
    if (user) {
      if (user.user_name == req.body.user_name) {
        errors.user_name =
          "User Name already exists. Please choose another User Name";
        return res.status(400).json(errors);
      }

      errors.email =
        "Email already exists. Please request to have your password reset.";
      return res.status(400).json(errors);
    }
    let newUser = new User({
      email: req.body.email,
      user_name: req.body.user_name,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => {
            errors.email = "something went wrong";
            res.status(400).json(errors);
          });
      });
    });
  });
});

// @route   POST /user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  let { email, password } = req.body;

  User.findOne({
    email
  }).then(user => {
    if (!user) {
      errors.email = "This Email does not Exist";
      return res.status(400).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          user_name: user.user_name,
          profile_image_url: user.image_url
        };
        jwt.sign(
          payload,
          keys,
          {
            expiresIn: 7200
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   PUT /user/profileimage
// @desc    upload profile photo
// @access  Private
router.put(
  "/profileimage",
  passport.authenticate("userPass", {
    session: false
  }),
  (req, res) => {
    const mimes = ["image/png", "image/jpeg", "image/jpg"];
    const busboy = new Busboy({
      headers: req.headers
    });

    if (req.files.image === undefined)
      return res.status(413).json({
        image: "Image is required"
      });

    busboy.on("finish", () => {
      const image = req.files.image;
      if (image.size > 3000000)
        return res.status(413).json({
          image: "Image can not be larger than 3mbs"
        });

      if (!mimes.includes(image.mimetype))
        return res.status(422).json({
          image: "This image format is not supported"
        });

      let aws = uploadToS3(image);
      aws.then(data => {
        let imageUrl = data.Location;
        User.findOneAndUpdate(
          {
            _id: req.user.id
          },
          {
            profile_image_url: imageUrl
          },
          {
            new: true
          }
        )
          .then(user => {
            if (!user)
              return res.status(400).json({
                image: "Sorry something went wrong"
              });
            const payload = {
              id: user.id,
              user_name: user.user_name,
              profile_image_url: user.profile_image_url
            };
            jwt.sign(
              payload,
              keys,
              {
                expiresIn: 7200
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    req.pipe(busboy);
  }
);

module.exports = router;
