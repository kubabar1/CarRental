package controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.transaction.Transactional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.hamcrest.CoreMatchers.is;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.carrental.controller.CommentController;
import com.carrental.controller.HomeController;
import com.carrental.model.Comment;
import com.carrental.service.CommentServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;

import config.PersistenceConfigTest;

@RunWith(MockitoJUnitRunner.class)
@ActiveProfiles("test")
public class CommentControllerTest {

	@Mock
	private CommentServiceImpl commentService;

	@InjectMocks
	private CommentController commentControllerMock;

	private MockMvc mockMvc;

	@Before
	public void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(commentControllerMock).build();
	}

	private List<Comment> createCommentList(Long vehicleId, int number) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		Date parsedDate = null;
		Timestamp timestamp = null;
		String secondsString;
		Comment comment;
		List<Comment> expectedComments = new ArrayList<Comment>();

		try {
			for (int i = 1; i <= number; i++) {
				secondsString = i % 60 < 10 ? 0 + "" + i % 60 : "" + i % 60;
				parsedDate = dateFormat.parse("2018-01-01 12:12:" + secondsString);
				timestamp = new java.sql.Timestamp(parsedDate.getTime());
				comment = new Comment((long) i, vehicleId, "test_" + i, "user_" + i, timestamp, (i - 1) % 5 + 1);
				expectedComments.add(comment);
				// System.out.println(comment.toString());
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}

		return expectedComments;
	}

	@Test
	public void add() throws Exception {
		long vehicleId = 1;
		int vehicleID = 1;
		List<Comment> expectedComments = createCommentList(vehicleId, 4);

		Mockito.when(commentService.getAllForVehicle((long) 1)).thenReturn(expectedComments);

		String getAllForVehicleTest = mockMvc.perform(get("/comments/all/1")).andExpect(status().isOk())
				.andExpect(jsonPath("$[0].id", is(1))).andExpect(jsonPath("$[0].vehicleId", is(vehicleID)))
				.andExpect(jsonPath("$[0].commentContent", is("test_1")))
				.andExpect(jsonPath("$[0].login", is("user_1")))
				.andExpect(jsonPath("$[0].creationDate", is("2018-01-01 12:12:01")))
				.andExpect(jsonPath("$[0].rating", is(1))).andExpect(jsonPath("$[1].id", is(2)))
				.andExpect(jsonPath("$[1].vehicleId", is(vehicleID)))
				.andExpect(jsonPath("$[1].commentContent", is("test_2")))
				.andExpect(jsonPath("$[1].login", is("user_2")))
				.andExpect(jsonPath("$[1].creationDate", is("2018-01-01 12:12:02")))
				.andExpect(jsonPath("$[1].rating", is(2))).andExpect(jsonPath("$[2].id", is(3)))
				.andExpect(jsonPath("$[2].vehicleId", is(vehicleID)))
				.andExpect(jsonPath("$[2].commentContent", is("test_3")))
				.andExpect(jsonPath("$[2].login", is("user_3")))
				.andExpect(jsonPath("$[2].creationDate", is("2018-01-01 12:12:03")))
				.andExpect(jsonPath("$[2].rating", is(3))).andExpect(jsonPath("$[3].id", is(4)))
				.andExpect(jsonPath("$[3].vehicleId", is(vehicleID)))
				.andExpect(jsonPath("$[3].commentContent", is("test_4")))
				.andExpect(jsonPath("$[3].login", is("user_4")))
				.andExpect(jsonPath("$[3].creationDate", is("2018-01-01 12:12:04")))
				.andExpect(jsonPath("$[3].rating", is(4))).andReturn().getResponse().getContentAsString();

		System.out.println("getAllForVehicleTest = " + getAllForVehicleTest);
		Mockito.verify(commentService, times(1)).getAllForVehicle((long) 1);
	}

	@Test
	public void shouldShowPagedCommentsList() throws Exception {
		long vehicleId = 1;
		int vehicleID = 1;
		List<Comment> expectedComments = createCommentList(vehicleId, 4);
		Page<Comment> page = new PageImpl<Comment>(expectedComments);
		Mockito.when(commentService.getCommentsForVehicle((long) 1, new PageRequest(0, 10))).thenReturn(page);

		String getCommentsForVehicle = mockMvc.perform(get("/comments/1?page=0&number=10")).andExpect(status().isOk())
				.andExpect(jsonPath("$.content[0].id", is(1)))
				.andExpect(jsonPath("$.content[0].vehicleId", is(vehicleID)))
				.andExpect(jsonPath("$.content[0].commentContent", is("test_1")))
				.andExpect(jsonPath("$.content[0].login", is("user_1")))
				.andExpect(jsonPath("$.content[0].creationDate", is("2018-01-01 12:12:01")))
				.andExpect(jsonPath("$.content[0].rating", is(1))).andExpect(jsonPath("$.content[1].id", is(2)))
				.andExpect(jsonPath("$.content[1].vehicleId", is(vehicleID)))
				.andExpect(jsonPath("$.content[1].commentContent", is("test_2")))
				.andExpect(jsonPath("$.content[1].login", is("user_2")))
				.andExpect(jsonPath("$.content[1].creationDate", is("2018-01-01 12:12:02")))
				.andExpect(jsonPath("$.content[1].rating", is(2))).andExpect(jsonPath("$.content[2].id", is(3)))
				.andExpect(jsonPath("$.content[2].vehicleId", is(vehicleID)))
				.andExpect(jsonPath("$.content[2].commentContent", is("test_3")))
				.andExpect(jsonPath("$.content[2].login", is("user_3")))
				.andExpect(jsonPath("$.content[2].creationDate", is("2018-01-01 12:12:03")))
				.andExpect(jsonPath("$.content[2].rating", is(3))).andExpect(jsonPath("$.content[3].id", is(4)))
				.andExpect(jsonPath("$.content[3].vehicleId", is(vehicleID)))
				.andExpect(jsonPath("$.content[3].commentContent", is("test_4")))
				.andExpect(jsonPath("$.content[3].login", is("user_4")))
				.andExpect(jsonPath("$.content[3].creationDate", is("2018-01-01 12:12:04")))
				.andExpect(jsonPath("$.content[3].rating", is(4))).andExpect(jsonPath("$.totalPages", is(1)))
				.andExpect(jsonPath("$.totalElements", is(4))).andExpect(jsonPath("$.numberOfElements", is(4)))
				.andReturn().getResponse().getContentAsString();

		long vehicleId2 = 2;
		int vehicleID2 = 2;
		List<Comment> expectedComments2 = createCommentList(vehicleId2, 20);
		Page<Comment> page2 = new PageImpl<Comment>(expectedComments2, new PageRequest(3, 5), 20);

		Mockito.when(commentService.getCommentsForVehicle((long) 2, new PageRequest(3, 5))).thenReturn(page2);

		String getCommentsForVehicle2 = mockMvc.perform(get("/comments/2?page=3&number=5")).andExpect(status().isOk())
				.andExpect(jsonPath("$.totalElements", is(20))).andExpect(jsonPath("$.size", is(5))).andReturn()
				.getResponse().getContentAsString();

		System.out.println("getCommentsForVehicle2 = " + getCommentsForVehicle2);
		Mockito.verify(commentService, times(1)).getCommentsForVehicle((long) 1, new PageRequest(0, 10));
		Mockito.verify(commentService, times(1)).getCommentsForVehicle((long) 2, new PageRequest(3, 5));
	}

	@Test
	public void addCommentForVehicleTest() throws Exception {
		long vehicleId = 1;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date parsedDate = dateFormat.parse("2018-01-01 12:12:12");
		Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());

		Comment comment = new Comment((long) 1, vehicleId, "test_" + 1, "user_" + 1, timestamp, 5);

		doNothing().when(commentService).addComment(comment);
		
		ObjectMapper mapper = new ObjectMapper();
		
		String jsonComment = mapper.writeValueAsString(comment);

		mockMvc.perform(post("/comments/" + vehicleId).contentType(MediaType.APPLICATION_JSON).content(jsonComment))
				.andExpect(status().isOk());
	}

}
