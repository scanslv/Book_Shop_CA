package com.iivanovs.bookshopca.repository;

import com.iivanovs.bookshopca.entity.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends CrudRepository<Address, Long> {
}
