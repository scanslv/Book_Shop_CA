package com.iivanovs.bookshopca.service;

import com.iivanovs.bookshopca.dao.UserDAO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserDAO applicationUserDAO;

    public UserDetailsServiceImpl(UserDAO applicationUserDAO) {
        this.applicationUserDAO = applicationUserDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.iivanovs.bookshopca.entity.User applicationUser = applicationUserDAO.findByUsername(email);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(email);
        }
        List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(applicationUser.getRole());
        return new User(applicationUser.getEmail(), applicationUser.getPassword(), authorityList);
    }
}
