

import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteJobAPI, GetAllJobAPI } from "../services/allAPI";

const AdminJobTable = ({ filterKeyword }) => {
  const [jobs, setJobs] = useState([]);  // Initialize jobs as an empty array
  const navigate = useNavigate();

  // Fetch jobs when component mounts
  useEffect(() => {
    const fetchData = async () => {
        const token = sessionStorage.getItem("token"); // Retrieve the token from sessionStorage
        if (!token) {
            console.log("No token found, please log in.");
            return;
        }

        const reqHeader = { Authorization: `Bearer ${token}` };

        try {
            const response = await GetAllJobAPI(reqHeader);
            console.log("Jobs fetched:", response);  // Log the response to see the data
            if (response && response.data && response.data.jobs) {
                setJobs(response.data.jobs);  // Assuming the jobs are in 'response.data.jobs'
            } else {
                console.log("No jobs found");
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    fetchData();
  }, []);  // Run once on component mount

  // Filter the jobs based on the keyword
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(filterKeyword.toLowerCase()) ||
    (job.company && job.company.name.toLowerCase().includes(filterKeyword.toLowerCase()))
  );

  // Handle Edit Job
  // const handleEditJob = (jobId) => {
  //   navigate(`admin/companies/:id`);
  // };

  // Handle Delete Job
const removeJob=async(id)=>{
  const token=sessionStorage.getItem("token")
  if(token){
    const reqHeader = { "Authorization": `Bearer ${token}` };



  try{
    const result =await deleteJobAPI(id,reqHeader)
    if(result.status==200){
      console.log('Deleted Successfully');
      
    }

  }catch(err){
    console.log(err);
  }
    
  }
}

  return (
    <div className="mt-5">
     

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Job Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No jobs available.</td>
            </tr>
          ) : (
            filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company.name}</td>
                <td>{job.salary}LPA</td>
                <td>{job.location}</td>
                <td>{job.jobType}</td>
                <td>
                  {/* <Button
                    variant="warning"
                    onClick={() => handleEditJob(`/admin/companies/${job.id}`)}
                    className="me-2"
                  >
                    Edit
                  </Button> */}
                  <Button
                    variant=""
                    onClick={() => removeJob(job?._id)}
                  >
                    <i style={{color:'red'}} class="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminJobTable;


