package com.example.petbackend.features.user.model;

import com.example.petbackend.features.role.model.Role;
import com.example.petbackend.features.user.dto.UserRegisterRequestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Table(name = "users")
@Entity
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    @Column(name = "full_name")
    private String fullName;

    private String email;
    private String password;
    private boolean enabled = true;

    @CreationTimestamp
    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE", updatable = false)
    private OffsetDateTime createdAt;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public User(Long id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public User(UserRegisterRequestDTO userDto) {
        this.email = userDto.email();
        this.fullName = userDto.fullName();
        setPassword(userDto.password().toCharArray());
    }

    public void setPassword(char[] plainPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(new String(plainPassword));
        java.util.Arrays.fill(plainPassword, ' ');
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = roles.stream()
                .map(role -> {
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role.getName().name());
                    //System.out.println("Authority created:" + authority.getAuthority());
                    return authority;
                })
                .collect(Collectors.toSet());
        //System.out.println("All authorities: " + authorities);
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public Long getId() {
        return id;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void deactive() {
        this.enabled = false;
    }
}
