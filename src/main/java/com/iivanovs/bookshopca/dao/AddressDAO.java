package com.iivanovs.bookshopca.dao;

import com.iivanovs.bookshopca.entity.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressDAO extends CrudRepository<Address, Long> {
}
