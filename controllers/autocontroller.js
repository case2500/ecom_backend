const Autonumber = require("../model/autonumberModel");





const createAutonumber = async (req, res) => {

  // console.log(fileData);
  const autonumber = await Autonumber.create({
    noauto:100,

  });
  console.log(autonumber);
  res.status(201).json(autonumber);
};




const getauto = async (req, res) => {
  console.log(req.body);
  const auto = await Autonumber.find();
  if (!auto) {
    const noauto = 1;
    console.log(noauto);
  } else {
    const noauto = Number(auto) + 1;
    console.log(noauto);
  }
  res.status(200).json(auto);
};

// ************ Update Silders
const updateauto = async (req, res) => {
  const auto = await Autonumber.find();
  if (!auto) {
    const noauto = 1;
    console.log(noauto);
  } else {
    const noauto = Number(auto) + 1;
    const updateauto = Autonumber.update;
    console.log(noauto);

    const updateduser = await Autonumber.update(
   
      {
        noauto: (Number(auto) + 1),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updateduser)
    res.status(200).json(updateduser)
  }
};

module.exports = {
  updateauto,
  getauto,
  createAutonumber
};
