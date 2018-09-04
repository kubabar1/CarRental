package com.carrental.repository;

import java.sql.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.carrental.dto.UserRegistrationDto;
import com.carrental.model.User;
import com.carrental.model.Vehicle;

@Repository
public class UserRepositoryImpl implements UserRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRoleRepository userRoleRepository;

	@Override
	public List<User> getUserListForPage(int page, int nb) {
		int idk = ((page - 1) * nb);

		return (List<User>) entityManager.createQuery("SELECT u FROM User u ORDER BY u.id ASC").setFirstResult(idk)
				.setMaxResults(nb).getResultList();
	}

	@Override
	public User getUserByLogin(String login) {
		User result = null;

		try {
			result = (User) entityManager
					.createQuery("SELECT u FROM User u LEFT JOIN FETCH u.userRolesList WHERE u.login=:loginp")
					.setParameter("loginp", login).getSingleResult();
		} catch (NoResultException nre) {
		}

		return result;
	}

	@Override
	public User getUserByEmail(String email) {
		User result = null;

		try {
			result = (User) entityManager
					.createQuery("SELECT u FROM User u  LEFT JOIN FETCH u.userRolesList WHERE u.email=:emailp")
					.setParameter("emailp", email).getSingleResult();
		} catch (NoResultException nre) {
		}

		return result;
	}

	@Override
	@Transactional
	public User addUser(UserRegistrationDto user) {
		User userToPersist = new User(user.getName(), user.getSurname(), user.getLogin(),
				passwordEncoder.encode(user.getPassword()), user.getEmail(), user.getPhone(), user.getBirthDate(),
				user.getPesel());

		long customerRoleId = 2;

		userToPersist.getUserRolesList().add(userRoleRepository.getUserRoleById(customerRoleId));

		entityManager.persist(userToPersist);
		return userToPersist;
	}

}
