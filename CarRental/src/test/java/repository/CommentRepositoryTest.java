package repository;

import static org.junit.Assert.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.carrental.model.Comment;
import com.carrental.model.Stars;
import com.carrental.repository.CommentRepository;
import com.carrental.repository.StarsRepository;

import config.PersistenceConfigTest;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = PersistenceConfigTest.class)
@ActiveProfiles("test")
public class CommentRepositoryTest {

	@Autowired
	CommentRepository commentRepository;
	
	@Autowired
	StarsRepository starsRepository;
	
	@Test
	@Transactional
	public void getVehicleCommentsForPageCountTest() {
		assertEquals(3,
				commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 10)).getNumberOfElements());
		assertEquals(1, commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 1)).getNumberOfElements());
		assertEquals(1, commentRepository.getCommentsForVehicle((long) 1, new PageRequest(1, 1)).getNumberOfElements());

		assertEquals(3, commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 10)).getTotalElements());
		assertEquals(3, commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 1)).getTotalElements());
		assertEquals(3, commentRepository.getCommentsForVehicle((long) 1, new PageRequest(1, 1)).getTotalElements());

		assertEquals(1, commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 10)).getTotalPages());
		assertEquals(2, commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 2)).getTotalPages());
		assertEquals(3, commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 1)).getTotalPages());
	}

	@Test
	@Transactional
	public void getVehicleCommentsForPageOrderTest() {

		Timestamp timestamp1 = commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 10)).getContent()
				.get(0).getCreationDate();
		Timestamp timestamp2 = commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 10)).getContent()
				.get(1).getCreationDate();
		Timestamp timestamp3 = commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 10)).getContent()
				.get(2).getCreationDate();

		assertTrue(timestamp1.after(timestamp2) && timestamp2.after(timestamp3));
		assertTrue(timestamp3.before(timestamp2) && timestamp2.before(timestamp1));
	}

	@Test
	@Transactional
	public void getVehicleCommentsForPageContentTest() throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date parsedDate = dateFormat.parse("2018-03-21 11:11:11");
		Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());

		assertEquals(new Long(2),
				commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 1)).getContent().get(0).getId());
		assertEquals(new Long(1), commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 1)).getContent()
				.get(0).getVehicleId());
		assertEquals("Recommend!", commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 1)).getContent()
				.get(0).getCommentContent());
		assertEquals("marek123", commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 1)).getContent()
				.get(0).getLogin());
		assertEquals(timestamp, commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 1)).getContent()
				.get(0).getCreationDate());
		assertEquals(new Integer(3), commentRepository.getCommentsForVehicle((long) 1, new PageRequest(0, 1))
				.getContent().get(0).getRating());
	}

	@Test
	@Transactional
	public void getAllComentsForVehicleCountTest() {
		assertEquals(3, commentRepository.getAllForVehicle((long) 1).size());
		assertEquals(1, commentRepository.getAllForVehicle((long) 2).size());
		assertEquals(0, commentRepository.getAllForVehicle((long) 3).size());
	}

	@Test
	@Transactional
	public void getAllComentsForVehicleContentTest() throws ParseException {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date parsedDate = dateFormat.parse("2018-03-21 11:11:11");
		Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());

		assertEquals(new Long(2), commentRepository.getAllForVehicle((long) 1).get(0).getId());
		assertEquals(new Long(1), commentRepository.getAllForVehicle((long) 1).get(0).getVehicleId());
		assertEquals("Recommend!", commentRepository.getAllForVehicle((long) 1).get(0).getCommentContent());
		assertEquals("marek123", commentRepository.getAllForVehicle((long) 1).get(0).getLogin());
		assertEquals(timestamp, commentRepository.getAllForVehicle((long) 1).get(0).getCreationDate());
		assertEquals(new Integer(3), commentRepository.getAllForVehicle((long) 1).get(0).getRating());
	}

	@Test
	@Transactional
	public void getAllComentsForVehicleOrderTest() {

		Timestamp timestamp1 = commentRepository.getAllForVehicle((long) 1).get(0).getCreationDate();
		Timestamp timestamp2 = commentRepository.getAllForVehicle((long) 1).get(1).getCreationDate();
		Timestamp timestamp3 = commentRepository.getAllForVehicle((long) 1).get(2).getCreationDate();

		assertTrue(timestamp1.after(timestamp2) && timestamp2.after(timestamp3));
		assertTrue(timestamp3.before(timestamp2) && timestamp2.before(timestamp1));
	}

	@Test
	@Transactional
	public void addCommentTest() {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());

		commentRepository.addComment(new Comment((long) 1, "test", "adam123", timestamp, 5));
		starsRepository.addStars(new Stars((long) 1, 5));

		assertEquals(4, commentRepository.getAllForVehicle((long) 1).size());

		assertEquals(new Long(5), commentRepository.getAllForVehicle((long) 1).get(0).getId());
		assertEquals(new Long(1), commentRepository.getAllForVehicle((long) 1).get(0).getVehicleId());
		assertEquals("test", commentRepository.getAllForVehicle((long) 1).get(0).getCommentContent());
		assertEquals("adam123", commentRepository.getAllForVehicle((long) 1).get(0).getLogin());
		assertEquals(timestamp, commentRepository.getAllForVehicle((long) 1).get(0).getCreationDate());
		assertEquals(new Integer(5), commentRepository.getAllForVehicle((long) 1).get(0).getRating());
	}

}
