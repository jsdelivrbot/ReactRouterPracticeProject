import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';

class PostsNew extends Component {
  renderField(field) { //field lets Field know it is responsible to deal with the input
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    );
  }



  render() {
    return (
      <form>
        <Field
          label="Title for Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Tags"
          name="tags"
          component={this.renderField}
          />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'PostsNewForm'
})(PostsNew);
