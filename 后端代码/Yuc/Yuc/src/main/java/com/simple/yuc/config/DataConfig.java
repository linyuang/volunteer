package com.simple.yuc.config;

import javax.sql.DataSource;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories("com.simple.yuc.repository")
public class DataConfig {
  
	//数据源配置
	@Bean
	public DataSource dataSource(){
		BasicDataSource ds = new BasicDataSource();
		ds.setDriverClassName("com.mysql.jdbc.Driver");
		ds.setUrl("jdbc:mysql://127.0.0.1:3306/yuc?useUnicode=true&characterEncoding=utf-8");
		ds.setUsername("root");
		ds.setPassword("root");
		ds.setInitialSize(5);
		ds.setMaxTotal(10);
		return ds;
	}
	
	
  @Bean
  public JdbcOperations jdbcTemplate(DataSource dataSource) {
    return new JdbcTemplate(dataSource);
  }
  
  //Jpa厂商适配器
  @Bean
  public JpaVendorAdapter jpaVendorAdapter() {
    HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
    adapter.setDatabase(Database.MYSQL);
    adapter.setShowSql(true);
    adapter.setGenerateDdl(false);
    adapter.setDatabasePlatform("org.hibernate.dialect.MySQLDialect");
    return adapter;
  }
  
  //jpa事务管理器
  @Bean(name="transactionManager")
  public JpaTransactionManager dataSourceTransactionManager() {
	  JpaTransactionManager  jpaTransactionManager = new JpaTransactionManager();
	  jpaTransactionManager.setDataSource(dataSource());
      return jpaTransactionManager;
  }
  
  //配置实体管理工厂
  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory(
		  DataSource dataSource,JpaVendorAdapter jpaVendorAdapter) {
    LocalContainerEntityManagerFactoryBean emfb = new LocalContainerEntityManagerFactoryBean();
    emfb.setDataSource(dataSource);
    emfb.setPackagesToScan("com.simple.yuc.entity");
    emfb.setJpaVendorAdapter(jpaVendorAdapter);
    return emfb;
  }
}