package com.iivanovs.bookshopca.Interface;


import com.iivanovs.bookshopca.entity.Address;
import com.iivanovs.bookshopca.entity.User;

public interface AddressService {
    public User create(long id, Address address);
    public User update(long id, Address address);
    public User delete(long user_id);
}
