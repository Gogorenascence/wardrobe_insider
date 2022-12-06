import React from 'react'

class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            model: '',
            manufacturer: '',
            color: '',
            picture_url: '',
            bins: [],
        };
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleBinChange = this.handleBinChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.bins;
        console.log(data)
        const conference = data.conference;

        const presentationsUrl = `http://localhost:8000/api/conferences/${conference}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationsUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json()
            console.log(newPresentation)

            const cleared = {
                presenter_name: '',
                presenter_email: '',
                company_name: '',
                title: '',
                synopsis: '',
                conference: '',
            };
            this.setState(cleared);
        }
    }

    handlePNChange(event) {
        const value = event.target.value;
        this.setState({presenter_name: value})
    }

    handlePEChange(event) {
        const value = event.target.value;
        this.setState({presenter_email: value})
    }

    handleCompanyNameChange(event) {
        const value = event.target.value;
        this.setState({company_name: value})
    }

    handleTitleChange(event) {
        const value = event.target.value;
        this.setState({title: value})
    }

    handleSynopsisChange(event) {
        const value = event.target.value;
        this.setState({synopsis: value})
    }
    handleConferenceChange(event) {
        const value = event.target.value;
        this.setState({conference: value})
    }


    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/'


        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({conferences: data.conferences})
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={this.handleSubmit} id="create-presentation-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.presenter_name} onChange={this.handlePNChange} placeholder="Presenter Name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                                <label htmlFor="presenter_name">Presenter Name</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="presenter_email" className="form-label">Presenter Email</label>
                                <input value={this.state.presenter_email} onChange={this.handlePEChange} type="presenter_email" className="form-control" name="presenter_email" id="presenter_email" placeholder="name@example.com"/>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.company_name} onChange={this.handleCompanyNameChange} placeholder="Company name" type="text" name="company_name" id="company_name" className="form-control"/>
                                <label htmlFor="company_name">Company Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control"/>
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="synopsis" className="form-label">Synopsis</label>
                                <textarea value={this.state.synopsis} onChange={this.handleSynopsisChange} className="form-control" required type="text" name="synopsis" id="synopsis" rows="3"></textarea>
                            </div>
                            <div className="mb-3">
                            <select value={this.state.conference} onChange={this.handleConferenceChange} required id="conferences" name="conferences" className="form-select">
                                <option value="">Choose a conference</option>
                                {this.state.conferences.map(conference => {
                                    return(
                                        <option key={conference.id} value={conference.id}>
                                            {conference.name}
                                        </option>
                                    )
                                })}
                            </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PresentationForm
