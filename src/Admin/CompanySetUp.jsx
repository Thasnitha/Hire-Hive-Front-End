

import Header from '../components/Header';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateCompanyAPI, GEtCompanyAPI } from '../services/allAPI';
import { toast } from 'react-toastify';

const CompanySetUp = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get company ID from the URL params
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: ""
  });
  const [loading, setLoading] = useState(false);

  // Fetch existing company details on component mount
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error('Please login first.');
          return;
        }
        const reqHeader = {
          'Authorization': `Bearer ${token}`,
        };
        const response = await GEtCompanyAPI(id, reqHeader);
        if (response.success) {
          setInput(response.data); // Pre-fill the form with the company details
        } else {
          toast.error('Failed to fetch company details.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching the company details.');
      }
    };
    fetchCompanyDetails();
  }, [id]);

  // Handle input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, description, location, website, logo } = input;

    // Validate required fields
    if (!name || !description || !location) {
      toast.error('Company name, description, and location are required.');
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Please login first.');
        setLoading(false);
        return;
      }

      const reqHeader = {
        'Authorization': `Bearer ${token}`,
      };

      const companyData = {
        name,
        description,
        location,
        website,
        logo,
      };

      const response = await UpdateCompanyAPI(id, companyData, reqHeader);

      if (response.success) {
        toast.success('Company updated successfully');
        navigate('/admin/companies'); // Redirect to the companies list
      } else {
        toast.error(response.message || 'Failed to update company.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the company.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '100px', paddingLeft: '80px' }}>
      <Header />
      <Container style={{ marginTop: "50px" }}>
        <Button onClick={() => navigate('/admin/companies')} variant="info" className="mb-3 btn btn-info">
          &larr; Back
        </Button>
        <h3 className="mb-4">Update Company</h3>
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formWebsite">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter website URL"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formLogo" className="mb-4">
            <Form.Label>Logo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter logo URL"
              name="logo"
              value={input.logo}
              onChange={changeEventHandler}
            />
          </Form.Group>
          <Button className="w-full" variant="dark" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default CompanySetUp;


