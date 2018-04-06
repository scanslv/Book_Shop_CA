package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.UserService;
import com.iivanovs.bookshopca.entity.Book;
import com.iivanovs.bookshopca.entity.User;
import com.iivanovs.bookshopca.repository.BookRepository;
import com.iivanovs.bookshopca.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private BookRepository bookRepository;


    @Override
    public Iterable<User> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<User> findOne(long id) {
        return repository.findById(id);
    }

    @Override
    public User deleteById(long id) {
        Optional<User> user = repository.findById(id);
        if (user.isPresent()) {
            repository.deleteById(id);
            return user.get();
        } else
            return null;
    }

    @Override
    public User create(User user) {
        User obj = new User(user.getName(), user.getSurname(), user.getPhone(), user.getEmail(),
                new BCryptPasswordEncoder().encode(user.getPassword()), user.getGender(), user.getDob());
        repository.save(obj);

        return obj;
    }

    @Override
    public User update(User user) {
        Optional<User> u = repository.findById(user.getId());
        if (u.isPresent()) {
            User user1 = u.get();
            user1.setName(user.getName());
            user1.setSurname(user.getSurname());
            if (user.getPhone() != null)
                user1.setPhone(user.getPhone());
            user1.setGender(user.getGender());
            user1.setDob(user.getDob());
            if (user.getRole() != null)
                user1.setRole(user.getRole());
            return repository.save(user1);

        } else
            return null;
    }

    @Override
    public User buy(long id, ArrayList<Book> books) {
        Optional<User> u = repository.findById(id);
        ArrayList<Book> bookArrayList = new ArrayList<>();
        boolean done = true;
        if (u.isPresent()) {
            User user1 = u.get();

            for (Book book : books) {
                Optional<Book> b = bookRepository.findById(book.getId());
                if (b.isPresent()) {
                    Book thisBook = b.get();
                    if (thisBook.getAvailable() > 0) {
                        thisBook.setAvailable(thisBook.getAvailable() - 1);
//                        bookRepository.save(thisBook);
                        user1.getBooks_purchased().add(thisBook);
                        bookArrayList.add(thisBook);
//                        user1 = repository.save(user1);
                    } else {
                        done = false;
                        break;
                    }
                }
            }
            if (done) {
                bookRepository.saveAll(bookArrayList);
                return repository.save(user1);
            } else
                return null;

        } else
            return null;
    }

    @Override
    public User login(String email, String password) {
        return repository.findByUsername(email);
    }

    @Override
    public List<User> checkEmail(String email) {
        return repository.checkEmail(email);
    }
}