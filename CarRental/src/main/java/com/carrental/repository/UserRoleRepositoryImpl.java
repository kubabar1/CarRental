package com.carrental.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import com.carrental.model.Equipment;
import com.carrental.model.User;
import com.carrental.model.UserRole;
import com.carrental.model.Vehicle;

public class UserRoleRepositoryImpl implements UserRoleRepositoryCustom {
	
	@PersistenceContext
	public EntityManager entityManager;
	
	@Autowired
	public UserRepository userRepository;

	@Override
	@Transactional
	public List<UserRole> getUnexistingDistinctUserRolesForUser(Long id) {
		User user = null;
		List<UserRole> newUrList = null;

		try {
			user = userRepository.getUserById(id);
			Set<UserRole> urList = null;

			if (user != null) {
				urList = user.getUserRolesList();
			}

			if (urList == null) {
				urList = (Set<UserRole>) entityManager.createQuery("SELECT ur FROM UserRole ur").getResultList();
			} else {
				
				List<String> urTypeList = new ArrayList<>();
				
				for(UserRole ur: urList) {
					urTypeList.add(ur.getType());
				}

				newUrList = entityManager
						.createQuery("SELECT ur FROM UserRole ur WHERE ur.type NOT IN (:userRoles)")
						.setParameter("userRoles", urTypeList).getResultList();
			}
		} catch (NoResultException e) {

		}

		return newUrList;
	}

}
