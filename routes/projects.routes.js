const express = require("express");
const auth = require("../middleware/auth.middleware");
const Tasks = require("../models/Tasks");
const router = express.Router({ mergeParams: true });

//api/tasks
router
  .route("/")

  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Tasks.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })

  .post(auth, async (req, res) => {
    try {
      const newTask = await Tasks.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newTask);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

router
  .route("/:taskId")
  .patch(auth, async (req, res) => {
    try {
      const { taskId } = req.params;
      const findedTask = await Tasks.findById(taskId);
      if (findedTask.userId.toString() === req.user._id) {
        const updatedTask = await Tasks.findByIdAndUpdate(taskId, req, body, {
          new: true,
        });
        res.send(updatedTask);
      }
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  .delete(auth, async (req, res) => {
    try {
      const { taskId } = req.params;
      const removedTask = await Tasks.findById(taskId);

      if (removedTask.userId.toString() === req.user._id) {
        await removedTask.remove();
        return res.send(null);
      } else {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports = router;
