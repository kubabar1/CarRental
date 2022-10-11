import React from 'react';
import './SendMessage.scss';

export function SendMessage(): JSX.Element {
    return (
        <div className="container col-md-8 ml-auto">
            <div id="contacts-send-message" className="card shadow ">
                <div className="card-header bg-secondary text-white">
                    <h3>Send e-mail:</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name-contacts-email"
                                placeholder="Enter name"
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label>E-mail:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email-contacts-email"
                                placeholder="Enter email"
                                name="email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Subject:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject-contacts-email"
                                placeholder="Enter subject"
                                name="subject"
                            />
                        </div>
                        <div className="form-group">
                            <label>Message:</label>
                            <textarea className="form-control" rows={5} id="message-contacts-email" />
                        </div>
                        <input
                            type="submit"
                            value="Send"
                            className="btn btn-primary send-message-button"
                            name="send-message-button"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
