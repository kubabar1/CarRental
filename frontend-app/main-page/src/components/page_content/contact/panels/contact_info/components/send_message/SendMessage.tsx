import React from 'react';
import './SendMessage.scss';
import { TranslationService } from '@car-rental/shared/service';

export function SendMessage(): JSX.Element {
    return (
        <div className="container col-md-8 ml-auto">
            <div id="contacts-send-message" className="card shadow ">
                <div className="card-header bg-secondary text-white">
                    <h3>{TranslationService.translate('sendEmail')}:</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>{TranslationService.translate('name')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name-contacts-email"
                                placeholder={TranslationService.translate('enterName')}
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label>{TranslationService.translate('email')}</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email-contacts-email"
                                placeholder={TranslationService.translate('enterEmail')}
                                name="email"
                            />
                        </div>
                        <div className="form-group">
                            <label>{TranslationService.translate('subject')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="subject-contacts-email"
                                placeholder={TranslationService.translate('enterSubject')}
                                name="subject"
                            />
                        </div>
                        <div className="form-group">
                            <label>{TranslationService.translate('message')}</label>
                            <textarea
                                className="form-control"
                                rows={5}
                                id="message-contacts-email"
                                placeholder={TranslationService.translate('enterMessage')}
                            />
                        </div>
                        <input
                            type="submit"
                            value={TranslationService.translate('send')}
                            className="btn btn-primary send-message-button"
                            name="send-message-button"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
