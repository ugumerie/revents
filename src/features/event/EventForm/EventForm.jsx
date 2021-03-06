/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event //specifically for redux form to initialize the form
  };
};

const actions = {
  createEvent,
  updateEvent
};

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'The event category is required'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date')
})

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {}
  }

  onFormSubmit = values => {
    //if the state has a id property then update else create
    values.venueLatLng = this.state.venueLatLng
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };

      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
    .then(result => getLatLng(result[0]))
    .then(latlng => {
      this.setState({
        cityLatLng: latlng
      })
    })
    .then(() => {
      this.props.change('city', selectedCity)
    })
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
    .then(result => getLatLng(result[0]))
    .then(latlng => {
      this.setState({
        venueLatLng: latlng
      })
    })
    .then(() => {
      this.props.change('venue', selectedVenue)
    })
  }

  render() {
    const { history, initialValues, invalid, submitting, pristine } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInput}
                placeholder='Give your event a name'
              />
              <Field
                name='category'
                component={SelectInput}
                options={category}
                placeholder='What is your event about?'
              />
              <Field
                name='description'
                component={TextArea}
                rows={3}
                placeholder='Tell us about your event'
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field
                name='city'
                component={PlaceInput}
                options={{types: ['(cities)']}}
                onSelect={this.handleCitySelect}
                placeholder='Event City'
              />
              <Field
                name='venue'
                component={PlaceInput} 
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
                onSelect={this.handleVenueSelect}
                placeholder='Event Venue'
              />
              <Field
                name='date'
                component={DateInput}
                placeholder='Event Date'
                dateFormat='dd LLL yyyy h:mm a'
                showTimeSelect
                timeFormat='HH:mm'
                onChangeRaw={(e) => e.preventDefault()}
              />
              {/* <Form.Field>
            <label>Event Title</label>
            <input
              name='title'
              onChange={this.handleInputChange}
              value={title}
              placeholder='Event Title'
            />
          </Form.Field> */}

              <Button disabled={invalid || submitting || pristine} positive type='submit'>
                Submit
              </Button>
              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push("/events")
                }
                type='button'
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm", validate })(EventForm));
