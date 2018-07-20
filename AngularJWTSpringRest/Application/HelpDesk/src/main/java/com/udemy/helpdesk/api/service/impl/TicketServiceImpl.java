package com.udemy.helpdesk.api.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.udemy.helpdesk.api.entity.ChangeStatus;
import com.udemy.helpdesk.api.entity.Ticket;
import com.udemy.helpdesk.api.repository.ChangeStatusRepository;
import com.udemy.helpdesk.api.repository.TicketRepository;
import com.udemy.helpdesk.api.service.TicketService;

@Service
@SuppressWarnings("deprecation")
public class TicketServiceImpl implements TicketService {
	
	@Autowired
	private TicketRepository ticketRepository;
	
	@Autowired
	private ChangeStatusRepository changeStatusRepository;

	@Override
	public Ticket createOrUpdate(Ticket ticket) {
		return ticketRepository.save(ticket);
	}

	@Override
	public Optional<Ticket> findById(String id) {
		return ticketRepository.findById(id);
	}

	@Override
	public void delete(String id) {
		ticketRepository.deleteById(id);
	}

	@Override
	public Page<Ticket> listTicket(int page, int count) {
		Pageable pages = new PageRequest(page, count);
		return ticketRepository.findAll(pages);
	}

	@Override
	public ChangeStatus createChangeStatus(ChangeStatus changeStatus) {
		return changeStatusRepository.save(changeStatus);
	}

	@Override
	public Iterable<ChangeStatus> listChangeStatus(String ticketId) {
		return changeStatusRepository.findByTicketIdOrderByDateChangeStatusDesc(ticketId);
	}

	@Override
	public Page<Ticket> findByCurrentUser(int page, int count, String userId) {
		Pageable pages = new PageRequest(page, count);
		return ticketRepository.findByUserIdOrderByDateDesc(pages, userId);
	}

	@Override
	public Page<Ticket> findByParameters(int page, int count, String title,
			String status, String priority) {
		Pageable pages = new PageRequest(page, count);
		return ticketRepository.findByTitleIgnoreCaseContainingAndStatusContainingAndPriorityContainingOrderByDateDesc(pages, title, status, priority);
	}

	@Override
	public Page<Ticket> findByParametersAndCurrentUser(int page, int count,
			String title, String status, String priority, String userId) {
		Pageable pages = new PageRequest(page, count);
		return ticketRepository.findByTitleIgnoreCaseContainingAndStatusContainingAndPriorityContainingAndUserIdOrderByDateDesc(pages, title, status, priority, userId);
	}

	@Override
	public Page<Ticket> findByNumber(int page, int count, Integer number) {
		Pageable pages = new PageRequest(page, count);
		return ticketRepository.findByNumber(pages, number);
	}

	@Override
	public Iterable<Ticket> findAll() {
		return ticketRepository.findAll();
	}

	@Override
	public Page<Ticket> findByParameterAndAssignedUser(int page, int count,
			String title, String status, String priority, String assignedUserId) {
		Pageable pages = new PageRequest(page, count);
		return ticketRepository.findByTitleIgnoreCaseContainingAndStatusContainingAndPriorityContainingAndAssignedUserIdOrderByDateDesc(pages, title, status, priority, assignedUserId);
	}
}
