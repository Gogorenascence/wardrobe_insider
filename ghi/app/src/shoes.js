import {useState, useEffect} from 'react';


const initialData = {
  conference: '',
  name: '',
  email: '',
}

const AttendConferenceForm = ()=> {
  const [formData, setFormData] = useState(initialData);
  const [conferences, setConference] = useState([]);

  useEffect(() => {
    const getConferences = async () => {
      const url = 'http://localhost:8000/api/conferences/'

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setConference(data.conferences);
      }
    }
    getConferences()
  }, [])

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8001/api/conferences/${formData.conference}/attendees/`;

    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const resp = await fetch(url, fetchOptions);
    if (resp.ok) {
      setFormData(initialData);
    }
  }

  return (
    <div className="my-5 container">
      <div className="row">

        <div className="col col-sm-auto">
          <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
        </div>

        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit} id="create-attendee-form">
                <h1 className="card-title">It's Conference Time!</h1>

                <p className="mb-3">Please choose which conference you'd like to attend.</p>

                <div className="mb-3">
                  <select onChange={handleFormChange} value={formData.conference} className="form-select" name="conference" id="conference" required>

                    <option value="">Choose a conference</option>
                    {conferences.map(conference => {
                      return (
                        <option key={conference.href} value={conference.id}>{conference.name}</option>
                      )
                    })}
                  </select>
                </div>

                <p className="mb-3">Now, tell us about yourself.</p>

                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleFormChange} required value={formData.name} placeholder="Your full name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Your full name</label>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleFormChange} required value={formData.email} placeholder="Your email address" type="email" id="email" name="email" className="form-control" />
                      <label htmlFor="email">Your email address</label>
                    </div>
                  </div>
                </div>

                <button className="btn btn-lg btn-primary">I'm going!</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendConferenceForm;
