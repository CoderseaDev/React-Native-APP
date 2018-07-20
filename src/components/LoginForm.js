import React , { Component } from 'react';
import { Button, Card, CardSec, Input, Spinner } from './common';

class LoginForm extends Component {
    render() {
        return (
          <Card>
              <CardSec>
                  <Input
                  placeholder="user@gmail.com"
                  label="Email"
                  />
              </CardSec>

              <CardSec>
                  <Input
                      placeholder="Password"
                      label="Password"
                  />
              </CardSec>

              <CardSec>
                  <Button>Log in</Button>
              </CardSec>
          </Card>
        );
    }
};

export default LoginForm;