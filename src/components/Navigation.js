import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Cerebro AI
                        </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <div class="container">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <Link className="nav-link" to="/">Notes</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/create">CreateNote</Link>
                            </li>
                            <li clas="nav-item">
                                <Link className="nav-link" to="/User">CreateUser</Link>
                            </li>
                        </ul>
                    </div>
                </div>


            </nav>
        )
    }
}
