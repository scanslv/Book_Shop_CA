package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.Interface.AddressService;
import com.iivanovs.bookshopca.entity.Address;
import com.iivanovs.bookshopca.entity.User;
import com.iivanovs.bookshopca.repository.AddressRepository;
import com.iivanovs.bookshopca.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public User create(long id, Address address) {
        Optional<User> u = userRepository.findById(id);

        if (u.isPresent()) {
            Address a = new Address(address.getLine1(), address.getLine2(), address.getCity(), address.getPostCode(), address.getCountry());
            a = addressRepository.save(a);
            User user = u.get();
            if (user.getAddress() == null) {
                user.setAddress(a);
                return userRepository.save(user);
            } else
                return null;
        } else
            return null;
    }

    @Override
    public User update(long id, Address address) {
        Optional<User> u = userRepository.findById(id);
        Optional<Address> a = addressRepository.findById(address.getId());

        if (u.isPresent() && a.isPresent()) {
            Address address1 = a.get();
            address1.setLine1(address.getLine1());
            address1.setLine2(address.getLine2());
            address1.setCity(address.getCity());
            address1.setPostCode(address.getPostCode());
            address1.setCountry(address.getCountry());
            addressRepository.save(address1);

            return userRepository.save(u.get());
        } else
            return null;

    }

    @Override
    public User delete(long user_id) {
        Optional<User> u = userRepository.findById(user_id);

        if (u.isPresent()) {
            User user = u.get();
            user.setAddress(null);
            return userRepository.save(user);
        } else
            return null;

    }
}