package com.etna.utils;

import com.etna.entity.User;
import com.opencsv.CSVWriter;

import java.io.PrintWriter;
import java.util.List;

public class WriteDataToCSV {

    public static void writeDataToCsvUsingStringArray(PrintWriter writer, List<User> customers) {
        String[] CSV_HEADER = { "id", "firstname", "lastname" };
        try (
                CSVWriter csvWriter = new CSVWriter(writer,
                        CSVWriter.DEFAULT_SEPARATOR,
                        CSVWriter.NO_QUOTE_CHARACTER,
                        CSVWriter.DEFAULT_ESCAPE_CHARACTER,
                        CSVWriter.DEFAULT_LINE_END);
        ){
            csvWriter.writeNext(CSV_HEADER);

            for (User customer : customers) {
                String[] data = {
                        customer.getId().toString(),
                        customer.getFirstName(),
                        customer.getLastName()
                };

                csvWriter.writeNext(data);
            }

            System.out.println("Write CSV using CSVWriter successfully!");
        }catch (Exception e) {
            System.out.println("Writing CSV error!");
            e.printStackTrace();
        }
    }
}
