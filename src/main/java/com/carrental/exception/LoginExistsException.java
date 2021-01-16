package com.carrental.exception;

public class LoginExistsException extends Throwable {

	public LoginExistsException(final String message) {
		super(message);
	}
}
