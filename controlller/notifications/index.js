const Notifications = require("../../model/Notifications");

const notificationValidaion = require("../../validator/notifications");

module.exports = {
  notications(req, res) {
    const { sender, receiver, notiType, content, refId, isRead } = req.body;

    const { isValid, error } = notificationValidaion({
      sender,
      receiver,
      notiType,
      content,
      refId,
      isRead,
    });

    if (!isValid) {
      return res.status(400).json(error);
    }
    Notifications.find()
      .then((result) => {
        if (result.length !== 0) {
          console.log("Notifications has more than one!");

          // If Exist Like
          let isExistLike = result.filter(
            (noti) =>
              noti.sender === sender &&
              noti.notiType === "like" &&
              noti.refId === refId
          );

          // Like
          if (
            isExistLike.length !== 0 &&
            isExistLike[0].notiType === notiType
          ) {
            console.log("Notifications already exist!");
            Notifications.deleteOne({
              sender: sender,
              notiType: notiType,
              refId: refId,
            })
              .then((deleted) => {
                res.status(200).json({ deleted });
              })
              .catch((error) => {
                res.status(500).json(error);
              });
          } else {
            const newNoti = new Notifications({
              sender,
              receiver,
              notiType,
              content,
              refId,
              isRead,
              createdAt: new Date().toISOString(),
            });

            newNoti
              .save()
              .then((created) => {
                res.status(201).json({ created });
              })
              .catch((error) => {
                res
                  .status(500)
                  .json({ error, message: "Faild to create notification!" });
              });
          }
        } else {
          console.log("No more notifications");
          const newNoti = new Notifications({
            sender,
            receiver,
            notiType,
            content,
            refId,
            isRead,
            createdAt: new Date().toISOString(),
          });

          newNoti
            .save()
            .then((created) => {
              return res.status(201).json({ created });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  },
  getNotifications(req, res) {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "'userId' must provide as params" });
    }

    Notifications.find({ receiver: userId })
      .sort({ createdAt: -1 })
      .exec(function (error, result) {
        if (error) {
          return res.status(500).json({ error });
        }
        Notifications.updateMany(
          { receiver: userId },
          { $set: { isRead: true } }
        )
          .then((updated) => {
            console.log(updated);
          })
          .catch((error) => console.log(error));
        return res.status(200).json({ result });
      });

    // Notifications.find({ receiver: userId })
    //   .then((result) => {
    //     let sorted = result.sort(
    //       (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
    //     );
    //     console.log(sorted);
    //     if (result.length !== 0) {
    //       Notifications.updateMany(
    //         { receiver: userId },
    //         { $set: { isRead: true } }
    //       )
    //         .then((updated) => {
    //           console.log(updated);
    //         })
    //         .catch((error) => console.log(error));
    //       return res.status(200).json({ result });
    //     } else {
    //       return res.status(200).json({ sorted });
    //     }
    //   })
    //   .catch((error) => {
    //     res.status(500).json(error);
    //   });
  },
  getIsRead(req, res) {
    const userId = req.params.userId;
    Notifications.find({ receiver: userId, isRead: false })
      .then((result) => {
        res.status(200).json({ unread: result.length });
      })
      .catch((error) => {
        res.status(500).json({ message: "Server error occured!" });
      });
  },
};
