package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.UserService;
import com.iivanovs.bookshopca.dao.AddressDAO;
import com.iivanovs.bookshopca.entity.*;
import com.iivanovs.bookshopca.dao.BookDAO;
import com.iivanovs.bookshopca.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private BookDAO bookDAO;


    @Override
    public Iterable<User> findAll() {
        return userDAO.findAll();
    }

    @Override
    public Optional<User> findOne(long id) {
        return userDAO.findById(id);
    }

    @Override
    public User deleteById(long id) {
        Optional<User> user = userDAO.findById(id);
        if (user.isPresent()) {
            ArrayList<Book> books = (ArrayList<Book>) bookDAO.findAll();
            for(Book book:books){
                for(Comment comment: user.get().getComments()){
                    if(book.getComments().contains(comment)){
                        book.getComments().remove(comment);
                        bookDAO.save(book);
                    }
                }
            }
            userDAO.deleteById(id);
            return user.get();
        } else
            return null;
    }

    @Override
    public User create(User user) {
        if (user instanceof OrdinaryUser) {
            User obj = new OrdinaryUser(user.getName(), user.getSurname(), user.getPhone(), user.getEmail(),
                    new BCryptPasswordEncoder().encode(user.getPassword()), user.getGender(), user.getDob());
            userDAO.save(obj);

            return obj;
        } else
            return null;
    }

    @Override
    public User update(User user) {
        Optional<User> u = userDAO.findById(user.getId());
        if (u.isPresent()) {
            User user1 = u.get();
            user1.setName(user.getName());
            user1.setSurname(user.getSurname());
            if (user.getPhone() != null)
                user1.setPhone(user.getPhone());
            user1.setGender(user.getGender());
            user1.setDob(user.getDob());

            if (user1.getClass() == user.getClass()) {
                return userDAO.save(user1);
            } else {
                return null;
            }
        } else
            return null;
    }

    @Override
    public User buy(long id, ArrayList<Book> books) {
        Optional<User> u = userDAO.findById(id);
        ArrayList<Book> bookArrayList = new ArrayList<>();
        boolean done = true;
        if (u.isPresent()) {
            User user1 = u.get();

            for (Book book : books) {
                Optional<Book> b = bookDAO.findById(book.getId());
                if (b.isPresent()) {
                    Book thisBook = b.get();
                    if (thisBook.getAvailable() > 0) {
                        thisBook.setAvailable(thisBook.getAvailable() - 1);
//                        bookuserDAO.save(thisBook);
                        user1.getBooks_purchased().add(thisBook);
                        bookArrayList.add(thisBook);
//                        user1 = dao.save(user1);
                    } else {
                        done = false;
                        break;
                    }
                }
            }
            if (done) {
                bookDAO.saveAll(bookArrayList);
                return userDAO.save(user1);
            } else
                return null;

        } else
            return null;
    }

    @Override
    public User login(String email, String password) {
        return userDAO.findByUsername(email);
    }

    @Override
    public List<User> checkEmail(String email) {
        return userDAO.checkEmail(email);
    }
}