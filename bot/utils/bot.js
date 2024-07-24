import { compare } from "./face.js";
import { extractText } from "./docs.js";
import {
  getUser,
  updateUserStatus,
  updatePercentage,
  updateRemarks,
} from "./function.js";

const bot = async () => {
  console.log("Bot is running...");
  try {
    const users = await getUser();
    if (users.length === 0) {
      console.log("No filled user found");
      return;
    }
    users.map(async (user) => {
      const compareResult = await compare(
        `http://localhost:3000/${user.details.images.face}`,
        `http://localhost:3000/${user.details.images.passport}`
      );
      const docsResult = await extractText(
        `http://localhost:3000/${user.details.images.passport}`,
        "image/all"
      );

      console.log(compareResult);
      console.log(docsResult);

      const checkDetails = {
        name:
          user.details.personalDetail.firstName.toLowerCase() +
            " " +
            user.details.personalDetail.lastName.toLowerCase() ===
          docsResult?.name?.toLowerCase(),

        country:
          user.details.addressDetail.country.toLowerCase() ===
          docsResult?.country?.toLowerCase(),
        passportNumber:
          user.details.personalDetail.identificationNumber.toLowerCase() ===
          docsResult?.passportno?.toLowerCase(),
      };

      if (
        compareResult.match &&
        checkDetails.name &&
        checkDetails.country &&
        checkDetails.passportNumber
      ) {
        const updateStatus = await updateUserStatus(user._id, "verified");
        const updatePerc = await updatePercentage(
          user._id,
          compareResult.similarityPercentage
        );
        await updateRemarks(user._id, "All Good");
        console.log(`User ${user._id} verified`);

        //send email logic

        return;
      }
      if (
        !compareResult.match ||
        !checkDetails.name ||
        !checkDetails.country ||
        !checkDetails.passportNumber
      ) {
        const updateStatus = await updateUserStatus(user._id, "rejected");
        const updatePerc = await updatePercentage(
          user._id,
          compareResult.similarityPercentage
        );
        let remarks = "";
        if (!compareResult.match) {
          await updateRemarks(user._id, "Face does not match");
          remarks = "Face does not match";
        }
        if (
          !checkDetails.name ||
          !checkDetails.country ||
          !checkDetails.passportNumber
        ) {
          await updateRemarks(user._id, "Details does not match");
          remarks = "Details does not match";
        }
        console.log(`User ${user._id} Rejected`);
        //send email logic

        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default bot;
