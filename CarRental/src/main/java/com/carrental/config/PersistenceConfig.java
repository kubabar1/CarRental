package com.carrental.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.support.PersistenceAnnotationBeanPostProcessor;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

@Configuration
@PropertySource(value = { "classpath:persistence-mysql.properties" })
@EnableJpaRepositories(basePackages = "com.carrental.repository")
public class PersistenceConfig implements EnvironmentAware {

	private Environment env;

	@Override
	public void setEnvironment(final Environment env) {
		this.env = env;
	}

	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();

		dataSource.setDriverClassName(env.getProperty("spring.datasource.driver-class-name"));
		dataSource.setUrl(env.getProperty("spring.datasource.url"));
		dataSource.setUsername(env.getProperty("spring.datasource.username"));
		dataSource.setPassword(env.getProperty("spring.datasource.password"));
		return dataSource;
	}

	@Bean
	public HibernateJpaVendorAdapter jpaVendorAdapter() {
		HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
		adapter.setDatabase(Database.MYSQL);
		adapter.setShowSql(true);
		adapter.setGenerateDdl(false);
		adapter.setDatabasePlatform("org.hibernate.dialect.MySQLDialect");

		return adapter;
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource,
			JpaVendorAdapter jpaAdapter) {
		LocalContainerEntityManagerFactoryBean entityManagerFactory = new LocalContainerEntityManagerFactoryBean();
		entityManagerFactory.setDataSource(dataSource);
		entityManagerFactory.setJpaVendorAdapter(jpaAdapter);
		entityManagerFactory.setPackagesToScan("com.carrental.model");

		return entityManagerFactory;
	}

	@Bean
	public JpaTransactionManager transactionManager() {
		return new JpaTransactionManager();
	}

	// @Bean
	// public BeanPostProcessor persistenceTranslation() {
	// return new PersistenceExceptionTranslationPostProcessor();
	// }
	//
	// @Bean
	// public PersistenceAnnotationBeanPostProcessor paBeanPostProcessor() {
	// return new PersistenceAnnotationBeanPostProcessor();
	// }
	//
	// @Bean
	// public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
	// return new PersistenceExceptionTranslationPostProcessor();
	// }
}