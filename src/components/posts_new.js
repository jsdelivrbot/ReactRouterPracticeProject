import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost} from '../actions';

class PostsNew extends Component {
  renderField(field) { //field lets Field know it is responsible to deal with the input
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      <div className="text-help">
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
      //field.input is an object has a bunch of eventhandlers and props in it
      // like onChange, onBlur, and the value of the input

      //meta.error property is automatically added to field object
      // by the validate function. Ex. If error in title. If errors object has a property
      // called title, then it will it will call renderField for title and pass along any
      // error message
    );
  }

  onSubmit(values) {
    // this === component

    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() { //handlesubmit will only run whats inside (onSubmit) if everything looks good on the reduxform side
    const { handleSubmit } = this.props;

    return (
      //reduxForm is only responsible for managing the state of the form (the data side of things)

      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title for Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
          />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) { //values is an object of what the user inputs in the three fields
  const errors = {};

// Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title!"; //title here must match the name in Field for error to show up correctly
  }
  if (!values.categories) {
    errors.categories =  'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  return errors;
  //If errors object is empty, the form is fine to submit
  //If errors has *any* properties, redux form assumes form is invalid

}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
