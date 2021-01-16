package com.carrental.service;

import com.carrental.exception.BookingUnavailableVehicleException;
import com.carrental.model.Booking;
import com.carrental.repository.BookingRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

@Service("bookingService")
@Transactional
public class BookingServiceImpl implements BookingService {

  @Autowired private BookingRepository bookingRepository;

  @Override
  public void addBooking(Booking booking) throws BookingUnavailableVehicleException {
    bookingRepository.addBooking(booking);
  }

  @Override
  public void cancelBooking(Long bookingId) {
    bookingRepository.cancelBooking(bookingId);
  }

  @Override
  public void bookingRent(Long bookingId) {
    bookingRepository.bookingRent(bookingId);
  }

  @Override
  public void bookingReturn(Long bookingId) {
    bookingRepository.bookingReturn(bookingId);
  }

  @Override
  public Page<Booking> getBookingsForPage(Pageable pageable) {
    return bookingRepository.getBookingsForPage(pageable);
  }

  @Override
  public Page<Booking> getBookingsRentedForPage(Pageable pageable) {
    return bookingRepository.getBookingsRentedForPage(pageable);
  }

  @Override
  public Page<Booking> getBookingsReservedForPage(Pageable pageable) {
    return bookingRepository.getBookingsReservedForPage(pageable);
  }

  @Override
  public Page<Booking> getBookingsCanceledForPage(Pageable pageable) {
    return bookingRepository.getBookingsCanceledForPage(pageable);
  }

  @Override
  public Page<Booking> getBookingsReturnedForPage(Pageable pageable) {
    return bookingRepository.getBookingsReturnedForPage(pageable);
  }

  @Override
  public Booking getBookingsById(Long bookingId) {
    return bookingRepository.getBookingsById(bookingId);
  }

  @Override
  public List<Booking> getAllBookings() {
    return bookingRepository.getAllBookings();
  }

  @Override
  public Page<Booking> getUserBookingsForPage(PageRequest pageRequest, Long userId) {
    return bookingRepository.getUserBookingsForPage(pageRequest, userId);
  }

  @Override
  public Page<Booking> getUserBookingsReservedForPage(PageRequest pageRequest, Long userId) {
    return bookingRepository.getUserBookingsReservedForPage(pageRequest, userId);
  }

  @Override
  public Page<Booking> getUserBookingsRentedForPage(PageRequest pageRequest, Long userId) {
    return bookingRepository.getUserBookingsRentedForPage(pageRequest, userId);
  }

  @Override
  public File createExcelBookingListExelFile(List<Booking> bookingList) throws IOException {
    String timeStamp =
        new SimpleDateFormat("yyyyMMddHHmmss").format(Calendar.getInstance().getTime());

    String fileName = "bookings_" + timeStamp + ".xlsx";

    System.out.println(fileName);

    final File xls = new File(fileName);
    final FileOutputStream fos = new FileOutputStream(xls);

    Workbook workbook = new XSSFWorkbook();
    CreationHelper createHelper = workbook.getCreationHelper();
    Sheet sheet = workbook.createSheet("Bookings");

    Font headerFont = workbook.createFont();
    headerFont.setBold(true);
    headerFont.setFontHeightInPoints((short) 14);

    CellStyle headerCellStyle = workbook.createCellStyle();
    headerCellStyle.setFont(headerFont);

    Row headerRow = sheet.createRow(0);

    String[] rowNames = {
      "id",
      "userId",
      "vehicleId",
      "receiptDate",
      "returnDate",
      "locationId",
      "bookingStateCode",
      "totalCost"
    };

    for (int i = 0; i < rowNames.length; i++) {
      Cell cell = headerRow.createCell(i);
      cell.setCellValue(rowNames[i]);
      cell.setCellStyle(headerCellStyle);
    }

    CellStyle dateCellStyle = workbook.createCellStyle();
    dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd-MM-yyyy HH:mm:ss"));

    int rowNum = 1;
    for (Booking booking : bookingList) {
      Row row = sheet.createRow(rowNum++);

      row.createCell(0).setCellValue(booking.getId());
      row.createCell(1).setCellValue(booking.getUserId());
      row.createCell(2).setCellValue(booking.getVehicleId());

      Cell receiptDateCell = row.createCell(3);
      receiptDateCell.setCellValue(booking.getReceiptDate());
      receiptDateCell.setCellStyle(dateCellStyle);

      Cell returnDateCell = row.createCell(4);
      returnDateCell.setCellValue(booking.getReturnDate());
      returnDateCell.setCellStyle(dateCellStyle);

      row.createCell(5).setCellValue(booking.getLocationId());
      row.createCell(6).setCellValue(booking.getBookingStateCode());
      row.createCell(7).setCellValue(booking.getTotalCost().doubleValue());
    }

    for (int i = 0; i < rowNames.length; i++) {
      sheet.autoSizeColumn(i);
    }

    workbook.write(fos);
    fos.close();

    workbook.close();

    return xls;
  }
}
