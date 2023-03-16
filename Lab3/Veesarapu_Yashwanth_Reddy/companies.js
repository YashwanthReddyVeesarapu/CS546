const { default: axios } = require("axios");

const people = require("./people");

async function getCompanies() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json"
  );
  return data;
}

function isValidListEmployeesInput(companyName) {
  if (!companyName) throw "Error: No valid input company name passed";
  if (typeof companyName !== "string") "Error: Company name should be a string";

  const trimmedCompanyName = companyName.trim();
  if (trimmedCompanyName.length === 0)
    throw "Error: Company name should not be empty string";
}

const listEmployees = async (companyName) => {
  isValidListEmployeesInput(companyName);
  const companies = await getCompanies();
  const employees = await people.getPeople();
  const searchedEmployees = [];

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    if (company.name == companyName) {
      const myObj = company;

      for (let j = 0; j < employees.length; j++) {
        if (company.id === employees[j].company_id) {
          searchedEmployees.push(
            `${employees[j].first_name} ${employees[j].last_name}`
          );
        }
      }

      searchedEmployees.sort((a, b) => {
        const aLast = a.split(" ")[1];
        const bLast = b.split(" ")[1];
        if (aLast < bLast) {
          return -1;
        }
        if (bLast < aLast) {
          return 1;
        }
        return 0;
      });

      myObj["employees"] = searchedEmployees;

      return myObj;
    }
  }
  throw `Error: No comapny with name ${companyName}`;
};

function isValidSameIndustryInput(industry) {
  if (!industry) throw "Error: No valid input industry name passed";
  if (typeof industry !== "string") "Error: Industry name should be a string";

  const trimmedIndustryName = industry.trim();
  if (trimmedIndustryName.length === 0)
    throw "Error: Industry name should not be empty string";
}

const sameIndustry = async (industry) => {
  isValidSameIndustryInput(industry);
  const companies = await getCompanies();
  const result = [];

  for (let i = 0; i < companies.length; i++) {
    if (companies[i].industry === industry) {
      result.push(companies[i]);
    }
  }
  if (result.length === 0) {
    throw `Error: No matching industry found: ${industry}`;
  }
  return result;
};

function isValidGetCompanyByInput(id) {
  if (!id) throw "Error: No valid input ID passed";
  if (typeof id !== "string") "Error: ID should be a string";

  const trimmedCompanyName = id.trim();
  if (trimmedCompanyName.length === 0)
    throw "Error: ID should not be empty string";
}

const getCompanyById = async (id) => {
  isValidGetCompanyByInput(id);
  const companies = await getCompanies();

  for (let i = 0; i < companies.length; i++) {
    if (companies[i].id === id) {
      return companies[i];
    }
  }
  throw "Error: Company not found";
};

module.exports = {
  getCompanies,
  listEmployees,
  sameIndustry,
  getCompanyById,
};
