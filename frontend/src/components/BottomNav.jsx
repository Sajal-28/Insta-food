import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/bottom-nav.css'
import { getFoodPartnerId, getSessionRole, isFoodPartnerSession } from '../utils/session'

const BottomNav = () => {
  const navigate = useNavigate()
  const [showPartnerPrompt, setShowPartnerPrompt] = React.useState(false)

  const handleCreateClick = (event) => {
    event.preventDefault()

    if (isFoodPartnerSession()) {
      navigate('/create-food')
      return
    }

    setShowPartnerPrompt(true)
  }

  return (
    <>
      <nav className="bottom-nav" role="navigation" aria-label="Bottom">
        <div className="bottom-nav__inner">
          <NavLink to="/" end className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
            <span className="bottom-nav__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
              </svg>
            </span>
            <span className="bottom-nav__label">Home</span>
          </NavLink>

          <button
            type="button"
            className={`bottom-nav__create-button ${isFoodPartnerSession() ? 'is-partner' : ''}`}
            onClick={handleCreateClick}
            aria-label="Create food reel"
          >
            <span className="bottom-nav__create-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            <span className="bottom-nav__label">Create</span>
          </button>

          <NavLink to="/saved" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
            <span className="bottom-nav__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
              </svg>
            </span>
            <span className="bottom-nav__label">Saved</span>
          </NavLink>
        </div>
      </nav>

      {showPartnerPrompt && (
        <div className="partner-sheet" role="dialog" aria-modal="true" aria-labelledby="partner-sheet-title">
          <button
            type="button"
            className="partner-sheet__backdrop"
            aria-label="Close"
            onClick={() => setShowPartnerPrompt(false)}
          />
          <div className="partner-sheet__card">
            <div className="partner-sheet__badge">Upload access</div>
            <h2 id="partner-sheet-title">Only food partners can upload food reels.</h2>
            <p>
              Switch to a food partner account if you want to publish your dishes, build a profile, and bring more people to your store.
            </p>
            <div className="partner-sheet__actions">
              <button type="button" className="partner-sheet__secondary" onClick={() => setShowPartnerPrompt(false)}>
                Maybe later
              </button>
              <button
                type="button"
                className="partner-sheet__primary"
                onClick={() => {
                  setShowPartnerPrompt(false)
                  navigate(getSessionRole() === 'user' ? '/food-partner/register' : '/food-partner/login')
                }}
              >
                Become a food partner
              </button>
            </div>
            {getFoodPartnerId() && (
              <button
                type="button"
                className="partner-sheet__link"
                onClick={() => {
                  setShowPartnerPrompt(false)
                  navigate('/create-food')
                }}
              >
                Continue as current partner
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default BottomNav
