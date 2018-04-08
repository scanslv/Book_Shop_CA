package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.AddressService;
import com.iivanovs.bookshopca.entity.Address;
import com.iivanovs.bookshopca.entity.User;
import com.iivanovs.bookshopca.dao.AddressDAO;
import com.iivanovs.bookshopca.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressDAO addressDAO;

    @Autowired
    private UserDAO userDAO;

    @Override
    public User create(long id, Address address) {
        Optional<User> u = userDAO.findById(id);

        if (u.isPresent()) {
            Address a = new Address(address.getLine1(), address.getLine2(),
                    address.getCity(), address.getPostCode(), address.getCountry());
            a = addressDAO.save(a);
            User user = u.get();
            if (user.getAddress() == null) {
                user.setAddress(a);
                return userDAO.save(user);
            } else
                return null;
        } else
            return null;
    }

    @Override
    public User update(long id, Address address) {
        Optional<User> u = userDAO.findById(id);
        Optional<Address> a = addressDAO.findById(address.getId());

        if (u.isPresent() && a.isPresent()) {
            Address address1 = a.get();
            address1.setLine1(address.getLine1());
            address1.setLine2(address.getLine2());
            address1.setCity(address.getCity());
            address1.setPostCode(address.getPostCode());
            address1.setCountry(address.getCountry());
            addressDAO.save(address1);

            return userDAO.save(u.get());
        } else
            return null;

    }

    @Override
    public User delete(long user_id) {
        Optional<User> u = userDAO.findById(user_id);

        if (u.isPresent()) {
            User user = u.get();
            user.setAddress(null);
            return userDAO.save(user);
        } else
            return null;

    }
}