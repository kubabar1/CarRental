package repository;

import com.carrental.repository.BookingRepository;
import config.PersistenceConfigTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = PersistenceConfigTest.class)
@ActiveProfiles("test")
public class BookingRepositoryTest {

  @Autowired BookingRepository bookingRepository;

  @Test
  @Transactional
  public void test() {}
}
