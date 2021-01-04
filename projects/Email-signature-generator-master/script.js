window.addEventListener("load", () => {
  // Data information
  const DataInfo = {
    UnitedStates: {
      address: "101 George Street, Gainesville, Florida",
      phoneIso: "+1"
    },
    Mexico: {
      address: "4546  Settlers Lane, Mexico",
      phoneIso: "+52"
    },
    Slovenia: {
      address: "Industrijska cesta 25, SI-6230, Postojna, Slovenia",
      phoneIso: "+386"
    },  
    China: {
      address: "2564  Morris Street, Ingram, Texas",
      phoneIso: "+86"
    },
    UnitedKindgdom: {
      address: "29  Tully Street, BOXHOLM, Iowa",
      phoneIso: "+44"
    },
    Netherlands: {
      address: "300  Settlers Lane, WOBURN, Massachusetts",
      phoneIso: "+31"
    },
    Turkey: {
      address: "1991  Myra Street, Riverside, Rhode Island",
      phoneIso: "+90"
    }
  }


  // Variables
  const nameInput = document.querySelector("#name");
  const nameSign = document.querySelector(".first-last");
  const jobPos = document.querySelector("#position");
  const jobSign = document.querySelector(".job-pos");
  const countryOption = document.querySelectorAll("#country option");
  const countrySelect = document.querySelector("#country");
  const companyAddress = document.querySelector(".company-address");
  const emailInput = document.querySelector("#mail");
  const userMail = document.querySelector(".user-mail");
  let fName = "";
  let lName = "";
  let titleName = "";
  const phoneInput = document.querySelector(".phone-number");
  const mobileInput = document.querySelector(".mobile-number");
  const primaryDeviceOption = document.querySelector("#primary-device");
  const secondaryDeviceOption = document.querySelector("#secondary-device");
  let phoneIso = "";
  const phonePreview = document.querySelector(".primary-number");
  const mobilePreview = document.querySelector(".secondary-number");
  const logos = document.querySelectorAll(".logo-choose button");
  const logoPreview = document.querySelector(".logo-preview");
  const createBtn = document.querySelector("#create-sign");
  const sign = document.querySelector(".sign");
  let isChecked = false;
  const instructionBtn = document.querySelector(".instruction");
  const popup = document.querySelector(".popup");
  const downloadBtn = document.querySelector(".download");
  const mailLink = document.querySelector(".mail-link");


  nameInput.addEventListener("change", () => {
    if (nameInput.value.split(" ").length >= 2){
      nameSign.textContent = nameInput.value;
    } else {
      alert("Please enter your Full Name");
    }
    
    titleName = nameInput.value.split(" ")[0];
    fName = nameInput.value.split(" ")[0].toLowerCase();
    lName = nameInput.value.split(" ")[1].toLowerCase();

    emailInput.value = `${fName}.${lName}`
    mailLink.textContent = emailInput.value + "@company.com";
  });

  jobPos.addEventListener("change", () => {
    jobSign.textContent = jobPos.value;
  });

  countrySelect.addEventListener("click", () => {
    countryOption.forEach(option => {
      if (option.selected){
        if (option.value === "us"){
          companyAddress.textContent = DataInfo.UnitedStates.address;
          phoneIso = DataInfo.UnitedStates.phoneIso;
        } else if (option.value === "mex"){
          companyAddress.textContent = DataInfo.Mexico.address;
          phoneIso = DataInfo.Mexico.phoneIso;
        } else if (option.value === "china"){
          companyAddress.textContent = DataInfo.China.address;
          phoneIso = DataInfo.China.phoneIso;
        } else if (option.value === "slo"){
          companyAddress.textContent = DataInfo.Slovenia.address;
          phoneIso = DataInfo.Slovenia.phoneIso;
        } else if (option.value === "uk"){
          companyAddress.textContent = DataInfo.UnitedKindgdom.address;
          phoneIso = DataInfo.UnitedKindgdom.phoneIso;
        } else if (option.value === "net"){
          companyAddress.textContent = DataInfo.Netherlands.address;
          phoneIso = DataInfo.Netherlands.phoneIso;
        } else if (option.value === "tur"){
          companyAddress.textContent = DataInfo.Turkey.address;
          phoneIso = DataInfo.Turkey.phoneIso;
        }
      }
    });
  });
  
  // Email input
  emailInput.addEventListener("change", () => {
    mailLink.textContent ="E: " +  emailInput.value + "@company.com";
  });

  // Phone Numbers
  phoneInput.addEventListener("change", () => {
    // Remove first 0
    phoneInput.value = parseInt(phoneInput.value, 10);
    phonePreview.innerHTML = "P: " +  phoneIso + " " + phoneInput.value;
    phonePreview.href = `tel:${phoneIso}${phoneInput.value}`;
  });

  mobileInput.addEventListener("change", () => {
    // Remove first 0
    mobileInput.value = parseInt(mobileInput.value, 10);
    mobilePreview.innerHTML = "C: " + phoneIso + " " + mobileInput.value;
    mobilePreview.href = `tel:${phoneIso}${mobileInput.value}`;
  });

  // Logo
  logos.forEach(logo => {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      logoPreview.src = `img/${logo.children[0].alt}.png`;
    });
  });


  // Check form data
  const checkFormData = () => {
    if (nameInput.value.split(" ").length < 2){
      return alert("Please enter your full name");
    } else if (jobPos.value === null || jobPos.value === ""){
      return alert("Please enter your position");
    } else if (emailInput.value === "" || emailInput.value === null || emailInput.value.indexOf('@') > -1){
      return alert("Please check your email again");
    } else if (phoneInput.value === mobileInput.value){
      return alert("You can't have two same numbers");
    } else if (primaryDeviceOption.children[0].selected && secondaryDeviceOption.children[0].selected){
      return alert("You have two phones selected");
    } else if (primaryDeviceOption.children[1].selected && secondaryDeviceOption.children[1].selected){
      return alert("You have two mobiles selected");
    } else {
      isChecked = true;
    }
    
    countryOption.forEach(option => {
      if (option.selected && option.value === "none"){
        alert("Please select country");
        return isChecked = false;
      }
    });

  }

  // Add link to href
  const mailHref = () => {
    mailLink.href = `mailto:${emailInput.value}@company.com`;
  }
  

  // Copy Files
  const copyFiles = () => {
    let range = document.createRange();
    range.selectNode(sign);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    createBtn.textContent = "Copied";
  }

  createBtn.addEventListener("click", () => {
    checkFormData();
    if (isChecked){
      copyFiles();
    }
  });

  instructionBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.animation = "instructionsPop 0.5s ease forwards";
    
    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      popup.style.animation = "instructionsClose 0.5s ease forwards";
    });
  });

  // Download
  const download = () => {
    let a = document.body.appendChild(document.createElement("a"));
    
    a.download = `${titleName}'s_signature.htm`;
    a.href = (
      `data:text/html,
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> ${titleName}'s Signature</title>
      </head>
      <style>
        * {
          font-family: Segoe UI, sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        h3, h4, img{
          margin: 5px;
        }

        a, p{
          margin-left: 5px;
        }

        .user-mail{
          margin: 0;
        }

        section{
          display: flex;
          flex-direction: column;
        }

      </style>
      ${sign.innerHTML}
      </html>`
    );

    a.click();
  }

  downloadBtn.addEventListener("click", () => {
    checkFormData();
    if (isChecked){
      mailHref();
      download();
    }
  });
});