import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [Event])
  async getAllEvents(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Query(() => Event)
  async getEvent(@Args('id') id: string): Promise<Event> {
    return this.eventService.findOne(id);
  }

  @Query(() => [Event])
  async getUpcomingEvents(): Promise<Event[]> {
    return this.eventService.findUpcoming();
  }

  @Mutation(() => Event)
  async createEvent(
    @Args('createEventDto') createEventDto: CreateEventDto,
  ): Promise<Event> {
    return this.eventService.create(createEventDto);
  }

  @Mutation(() => Event)
  async updateEvent(
    @Args('id') id: string,
    @Args('updateEventDto') updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.update(id, updateEventDto);
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Args('id') id: string): Promise<boolean> {
    return this.eventService.remove(id);
  }
}
