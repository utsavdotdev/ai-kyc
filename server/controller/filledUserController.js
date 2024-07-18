import orgForm from "../model/form.schema.js";
import FilledUser from "../model/filleduser.schema.js";

export const submitKYC = async (req, res) => {
  try {
    const form = await orgForm.findOne({ link: req.body.link });

    if (!form) {
      return res.status(403).json({ message: "Form is not Active." });
    }
    // save data to the filledUser schema
    const filledUserData = new FilledUser({
      userId: req.body.userId,
      formId: form._id,
      status: "pending",
      accuracy: "",
      details: {
        personalDetail: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          identificationNumber: req.body.identificationNumber,
          dob: req.body.dob,
          gender: req.body.gender,
          phoneNumber: req.body.phone,
        },
        addressDetail: {
          addressline1: req.body.addressline1,
          addressline2: req.body.addressline2,
          country: req.body.country,
          zip: parseInt(req.body.zipCode),
        },
        images: {
          face: req.files["face"][0].path,
          passport: req.files["passport"][0].path,
        },
      },
    });

    const filledData = await filledUserData.save();
    if (!filledData) {
      return res.status(500).json({
        message: "Error saving KYC data, updating the user array in form",
      });
    }

    if (filledData) {
      await orgForm.findOneAndUpdate(
        { link: req.body.link },
        { $push: { users: filledData._id } },
        { new: true }
      );
      console.log("Data updated in the array of the org form");
    }

    res.status(200).json({
      message:
        "KYC data received and saved successfully. Wait for Verification on Email.",
      face: req.files["face"][0].path,
      passport: req.files["passport"][0].path,
    });
  } catch (error) {
    console.error("Error processing KYC data:", error);
    res.status(500).json({ message: "Error processing KYC data" });
  }
};
