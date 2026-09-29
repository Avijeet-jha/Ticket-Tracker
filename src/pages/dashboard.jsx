import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>Ticket Management</h1>
          <p>Manage and review submitted tickets</p>
        </div>

        <div className="manager-info">
          <span>Manager</span>
        </div>
      </header>


      {/* Dashboard Content */}
      <main className="dashboard-content">

        <h2>Dashboard</h2>


        {/* Statistics */}
        <div className="stats-container">

          <div className="stat-card">
            <h3>Total Tickets</h3>
            <p>25</p>
          </div>

          <div className="stat-card">
            <h3>Pending Tickets</h3>
            <p>10</p>
          </div>

          <div className="stat-card">
            <h3>Accepted Tickets</h3>
            <p>12</p>
          </div>

          <div className="stat-card">
            <h3>Rejected Tickets</h3>
            <p>3</p>
          </div>

        </div>


        {/* Ticket Section */}
        <section className="ticket-section">

          <div className="ticket-section-header">
            <h2>Tickets</h2>

            <div className="ticket-filters">
              <button className="active-filter">All</button>
              <button>Pending</button>
              <button>Accepted</button>
              <button>Rejected</button>
            </div>
          </div>


          {/* Ticket List */}

          <div className="ticket-list">

            {/* Ticket 1 */}
            <div className="ticket-card">

              <div className="ticket-details">

                <div className="ticket-id">
                  #101
                </div>

                <div className="ticket-info">
                  <h3>Login Issue</h3>
                  <p>
                    Unable to login to the system
                  </p>

                  <div className="ticket-meta">
                    <span>User: Rahul</span>
                    <span>Priority: High</span>
                  </div>
                </div>

              </div>

              <div className="ticket-actions">

                <span className="ticket-status pending">
                  Pending
                </span>

                <button className="accept-btn">
                  Accept
                </button>

                <button className="reject-btn">
                  Reject
                </button>

              </div>

            </div>


            {/* Ticket 2 */}
            <div className="ticket-card">

              <div className="ticket-details">

                <div className="ticket-id">
                  #102
                </div>

                <div className="ticket-info">
                  <h3>System Error</h3>
                  <p>
                    Error while opening the dashboard
                  </p>

                  <div className="ticket-meta">
                    <span>User: Priya</span>
                    <span>Priority: Medium</span>
                  </div>
                </div>

              </div>

              <div className="ticket-actions">

                <span className="ticket-status pending">
                  Pending
                </span>

                <button className="accept-btn">
                  Accept
                </button>

                <button className="reject-btn">
                  Reject
                </button>

              </div>

            </div>


            {/* Ticket 3 */}
            <div className="ticket-card">

              <div className="ticket-details">

                <div className="ticket-id">
                  #103
                </div>

                <div className="ticket-info">
                  <h3>Password Reset</h3>
                  <p>
                    User requested a password reset
                  </p>

                  <div className="ticket-meta">
                    <span>User: Amit</span>
                    <span>Priority: Low</span>
                  </div>
                </div>

              </div>

              <div className="ticket-actions">

                <span className="ticket-status accepted">
                  Accepted
                </span>

              </div>

            </div>


          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;