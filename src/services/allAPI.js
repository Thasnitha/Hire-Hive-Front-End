import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./ServerURL";

// registerAPI
export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}

//login
export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}


//updateProfile
export const UpdateProfileAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/user/profileUpdate`,reqBody,reqHeader)
}
// register company
export const registerCompanyAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/registerCompany`,reqBody,reqHeader)
}
// export const UpdateCompanyAPI=async(reqBody,reqHeader)=>{
//     return await commonAPI("PUT",`${SERVER_BASE_URL}/admin/companies/:id`,reqBody,reqHeader)
// }
// export const GEtCompanyBYIDAPI=async(reqHeader)=>{
//     return await commonAPI("GET",`${SERVER_BASE_URL}/get/:id`,{},reqHeader)
// }
export const GEtCompanyAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/getCompany`,{},reqHeader)
}
export const GetAdminJobAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/getAdminJob`,{},reqHeader)
}

export const PostJobAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/postJob`,reqBody,reqHeader)
}
// export const GetAllJobAPI=async(reqHeader)=>{
//     return await commonAPI("GET",`${SERVER_BASE_URL}/getAlljob`,{},reqHeader)
// }
export const GetAllJobAPI = async (reqHeader) => {
    try {
        const response = await commonAPI("GET", `${SERVER_BASE_URL}/getAlljob`, {}, reqHeader);
        console.log('API Response:', response); // Log the response to see the job data
        return response;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return null;
    }
};
// export const ApplyJobAPI = async (reqHeader,reqBody, jobId) => {
//     return await commonAPI("POST", `${SERVER_BASE_URL}/applyForJob/${jobId}`, reqBody, reqHeader);
// }
export const ApplyJobAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_BASE_URL}/applyForJob/${id}`, reqBody, reqHeader);
  };

  
export const GETAppliedJobAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/getAppliedJob`,{},reqHeader)
}
export const GETApplicantsAPI = async (reqHeader, jobId) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/getapplicants/${jobId}`, {}, reqHeader);
}

// export const UpdateStatus=async(reqBody,reqHeader)=>{
//     return await commonAPI("PUT",`${SERVER_BASE_URL}/updateStatus/:id`,reqBody,reqHeader)
// }

// export const GEtJobByIDAPI=async(reqHeader)=>{
//     return await commonAPI("GET",`${SERVER_BASE_URL}/get/:id`,{},reqHeader)
// }
export const GEtJobByIDAPI = async (reqHeader, jobId) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/get/${jobId}`, {}, reqHeader);
  }
//   export const getApplicantsByCompanyAPI = async (reqHeader, ) => {
//     return await commonAPI("GET", `${SERVER_BASE_URL}/getApplicantsByCompany/:id`, {}, reqHeader);
//   }
export const getApplicantsByCompanyAPI = async (reqHeader, companyId) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/getApplicantsByCompany/${companyId}`, {}, reqHeader);
};
export const UpdateStatus = async (reqBody, reqHeader, applicationId) => {
    return await commonAPI("PUT", `${SERVER_BASE_URL}/updateStatus/${applicationId}`, reqBody, reqHeader);
}
// export const UpdateStatus = async (reqBody, reqHeader, applicationId) => {
//     console.log("URL:",` ${SERVER_BASE_URL}/updateStatus/${applicationId}`); // Check if applicationId is correct
//     console.log("Request Body:", reqBody); // Should contain status
//     console.log("Request Header:", reqHeader); // Check Authorization token
//     return await commonAPI("PUT", `${SERVER_BASE_URL}/updateStatus/${applicationId}`, reqBody, reqHeader);
// };
// export const UpdateStatus = async (reqBody, reqHeader, applicationId, jobId) => {
//     console.log("API Call - URL:", `${SERVER_BASE_URL}/updateStatus/${applicationId}/${jobId}`);
//     console.log("Request Body:", reqBody);
//     console.log("Request Header:", reqHeader);
//     console.log("Application ID:", applicationId); // Ensure this matches the MongoDB _id
//     console.log("Job ID:", jobId); // Ensure this matches the MongoDB _id of the job

//     return await commonAPI("PUT", `${SERVER_BASE_URL}/updateStatus/${applicationId}/${jobId}`, reqBody, reqHeader);
// };

export const UpdateCompanyAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_BASE_URL}/admin/companies/${id}`, reqBody, reqHeader);
}

export const GEtCompanyBYIDAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/get/${id}`, {}, reqHeader);
}


//delete job
export const deleteJobAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_BASE_URL}/job/${id}/remove`, {}, reqHeader);
}
