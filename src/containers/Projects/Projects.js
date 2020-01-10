import React from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Projects.css';
import axios from 'axios';


const API_URL = 'https://j0vbqasfb0.execute-api.ap-southeast-1.amazonaws.com/Dev/questions?limit=3&uuid=bc37e56f-1f7f-5ffc-96cd-edf733f49dcd&page=1';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

class Projects extends React.PureComponent {

    stateapi = {
        users: []
    }

    state = {
        editingId: null,
        search: '',
    };

    componentDidMount() {
        const url = `${API_URL}`;
        axios.get(url).then(response => response.data)
            .then((data) => {
                this.setState({ users: data })
                console.log("get data here >>> ",this.state.users)
            })
    }

    render() {

        let questions;
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };


        if(this.state.users){
            console.log(">>> ", this.state.users);

            questions = this.state.users.questions.map((video, index) => {
                let answers = JSON.parse(this.state.users.questions[index].answers);
                console.log("answers >> ", answers);
                return (
                    <div key={index}>
                        <div>
                            <h3>{this.state.users.questions[index].question}</h3>

                            <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
                                { answers.answers.map((option, i) =>
                                    <RadioButton
                                        value={i}
                                        label= {option}
                                        style={styles.radioButton}
                                    />
                                )}
                            </RadioButtonGroup>
                        </div>
                    </div>
                );
            });

        }

        return (
            <div>

                <Slider {...settings}>
                    {questions}
                </Slider>

            </div>
        );
    }
}

export default connect(state => ({
    projects: state.projects,
}))(Projects);
