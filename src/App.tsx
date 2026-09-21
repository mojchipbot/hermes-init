import { useState } from 'react'
import './App.css'

interface CreditsInfo {
  creditsUsed: number
  currentModel: string
}

const AVAILABLE_MODELS = [
  'anthropic/claude-3-opus',
  'anthropic/claude-3-sonnet',
  'anthropic/claude-3-haiku',
  'anthropic/claude-haiku-4.5',
  'openai/gpt-4',
  'openai/gpt-4-turbo',
  'openai/gpt-3.5-turbo',
  'google/gemini-pro',
  'meta/llama-2-70b',
  'mistral/mistral-large',
]

function App() {
  const [creditsInfo, setCreditsInfo] = useState<CreditsInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[3])
  const [message, setMessage] = useState('')

  const fetchCredits = async () => {
    setLoading(true)
    setMessage('')
    try {
      // Simulate fetching credits from Hermes API
      // In real implementation, this would call an actual endpoint
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setCreditsInfo({
        creditsUsed: Math.floor(Math.random() * 10000),
        currentModel: selectedModel,
      })
    } catch (error) {
      setMessage('Error fetching credits')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleModelChange = async (model: string) => {
    setSelectedModel(model)
    setMessage('')
    try {
      // Simulate changing model
      await new Promise(resolve => setTimeout(resolve, 500))
      setMessage(`✓ Model changed to ${model}`)
    } catch (error) {
      setMessage('Error changing model')
      console.error(error)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>🚀 Hermes Control Panel</h1>
        
        <div className="section">
          <button 
            className="btn btn-primary" 
            onClick={fetchCredits}
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Fetch Credits'}
          </button>

          {creditsInfo && (
            <div className="info-box">
              <div className="info-item">
                <span className="label">Credits Used:</span>
                <span className="value">{creditsInfo.creditsUsed.toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span className="label">Current Model:</span>
                <span className="value">{creditsInfo.currentModel}</span>
              </div>
            </div>
          )}
        </div>

        <div className="divider"></div>

        <div className="section">
          <label htmlFor="model-select" className="label">
            Select Model:
          </label>
          <select
            id="model-select"
            className="select"
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
          >
            {AVAILABLE_MODELS.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {message && (
          <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
