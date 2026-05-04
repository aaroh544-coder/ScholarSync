const { useState, useEffect, useMemo, useCallback } = React;

// --- Icons ---
const IconClock = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconFlame = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconTrash = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>;
const IconMoon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

// --- Puzzle Engine ---
const generatePuzzle = (type) => {
    if (type === 'School') {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const op = Math.random() > 0.5 ? '+' : '-';
        if (op === '-') {
            const max = Math.max(a, b);
            const min = Math.min(a, b);
            return { question: `What is ${max} - ${min}?`, answer: (max - min).toString() };
        }
        return { question: `What is ${a} + ${b}?`, answer: (a + b).toString() };
    } else {
        const x = Math.floor(Math.random() * 12) + 3;
        const A = Math.floor(Math.random() * 8) + 2;
        const B = Math.floor(Math.random() * 20) + 1;
        const op = Math.random() > 0.5 ? '+' : '-';
        if (op === '+') {
            return { question: `Solve for x: ${A}x + ${B} = ${A * x + B}`, answer: x.toString() };
        } else {
            return { question: `Solve for x: ${A}x - ${B} = ${A * x - B}`, answer: x.toString() };
        }
    }
};

// --- Components ---

const ToggleSwitch = ({ checked, onChange, disabled }) => (
    <button 
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${checked ? 'bg-blue-600' : 'bg-slate-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const OnboardingModal = ({ setOnboarding }) => {
    const [step, setStep] = useState(1);
    const [type, setType] = useState('');
    const [level, setLevel] = useState('');
    const [goal, setGoal] = useState('');

    const handleComplete = () => {
        if (!type || !level || !goal) return;
        setOnboarding({ type, level, goal: parseFloat(goal) });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-100 p-4 z-50">
            <div className="glass-panel rounded-2xl shadow-xl max-w-md w-full p-8 overflow-hidden relative">
                {/* Decorative background blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                
                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
                            <img src="logo.png" alt="ScholarSync Logo" className="w-full h-full object-contain drop-shadow-md" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800">Welcome to ScholarSync</h1>
                        <p className="text-slate-500 mt-2">Let's calibrate your experience.</p>
                    </div>

                    <div className="space-y-6 min-h-[200px]">
                        {step === 1 && (
                            <div className="animate-fade-in">
                                <label className="block text-sm font-medium text-slate-700 mb-3">Where are you currently studying?</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => { setType('School'); setStep(2); }}
                                        className="py-4 px-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-slate-700"
                                    >
                                        School
                                    </button>
                                    <button 
                                        onClick={() => { setType('College'); setStep(2); }}
                                        className="py-4 px-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-slate-700"
                                    >
                                        College
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fade-in">
                                <label className="block text-sm font-medium text-slate-700 mb-3">
                                    {type === 'School' ? 'Which grade are you in?' : 'Which year are you in?'}
                                </label>
                                <select 
                                    value={level} 
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none bg-white"
                                >
                                    <option value="" disabled>Select your {type === 'School' ? 'grade' : 'year'}</option>
                                    {type === 'School' 
                                        ? Array.from({length: 12}, (_, i) => <option key={i} value={`Grade ${i+1}`}>Grade {i+1}</option>)
                                        : ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Post-Grad'].map(y => <option key={y} value={y}>{y}</option>)
                                    }
                                </select>
                                <div className="mt-8 flex justify-between">
                                    <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-700 font-medium px-4 py-2">Back</button>
                                    <button 
                                        onClick={() => level && setStep(3)} 
                                        disabled={!level}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-fade-in">
                                <label className="block text-sm font-medium text-slate-700 mb-3">Set your daily goal (hours)</label>
                                <input 
                                    type="number" 
                                    min="0.5" step="0.5"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    placeholder="e.g., 2.5"
                                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                />
                                <div className="mt-8 flex justify-between">
                                    <button onClick={() => setStep(2)} className="text-slate-500 hover:text-slate-700 font-medium px-4 py-2">Back</button>
                                    <button 
                                        onClick={handleComplete} 
                                        disabled={!goal}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        Complete Setup <IconCheck />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${step === i ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PuzzleModal = ({ onboarding, onSolve, scheduleTitle }) => {
    const [puzzle, setPuzzle] = useState(null);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        setPuzzle(generatePuzzle(onboarding.type));
    }, [onboarding.type]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (answer.trim() === puzzle.answer) {
            onSolve();
        } else {
            setError(true);
            setAnswer('');
            setTimeout(() => setError(false), 1000);
        }
    };

    if (!puzzle) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center transform transition-all">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-6 animate-bounce">
                    <IconClock />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Time to Focus!</h2>
                <p className="text-slate-500 mb-8">Dismiss the alarm by solving the puzzle below.<br/><span className="text-sm font-medium text-blue-600">Session: {scheduleTitle}</span></p>
                
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                    <p className="text-2xl font-mono font-medium text-slate-800">{puzzle.question}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Your answer"
                        className={`w-full text-center text-xl border-2 rounded-xl px-4 py-4 mb-6 focus:outline-none transition-all ${error ? 'border-red-500 bg-red-50 animate-shake text-red-700' : 'border-slate-200 focus:border-blue-500'}`}
                        autoFocus
                    />
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white text-lg font-medium py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                    >
                        Dismiss Alarm
                    </button>
                </form>
            </div>
        </div>
    );
};

const Dashboard = ({ schedules, setSchedules, holidayMode, setHolidayMode, streak }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newTime, setNewTime] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTitle || !newTime) return;
        
        const newSchedule = {
            id: Date.now().toString(),
            title: newTitle,
            time: newTime,
            enabled: true,
            lastTriggeredDate: null
        };
        
        setSchedules([...schedules, newSchedule].sort((a, b) => a.time.localeCompare(b.time)));
        setShowAddModal(false);
        setNewTitle('');
        setNewTime('');
    };

    const toggleSchedule = (id) => {
        setSchedules(schedules.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    };

    const deleteSchedule = (id) => {
        setSchedules(schedules.filter(s => s.id !== id));
    };

    // Calculate next alarm
    const nextAlarm = useMemo(() => {
        if (holidayMode || schedules.filter(s => s.enabled).length === 0) return null;
        
        const now = new Date();
        const currentMins = now.getHours() * 60 + now.getMinutes();
        
        let next = null;
        let minDiff = Infinity;
        
        const activeSchedules = schedules.filter(s => s.enabled);
        for (const s of activeSchedules) {
            const [hours, mins] = s.time.split(':').map(Number);
            const schedMins = hours * 60 + mins;
            
            let diff = schedMins - currentMins;
            // If it's already passed today, consider it for tomorrow
            if (diff <= 0) {
                diff += 24 * 60;
            }
            
            if (diff < minDiff) {
                minDiff = diff;
                next = s;
            }
        }
        return next;
    }, [schedules, holidayMode]);

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <header className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <img src="logo.png" alt="ScholarSync Logo" className="w-full h-full object-contain drop-shadow-sm" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">ScholarSync</h1>
                </div>
                
                <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-full shadow-sm">
                    <IconMoon />
                    <span className="text-sm font-medium text-slate-700">Holiday Mode</span>
                    <ToggleSwitch checked={holidayMode} onChange={setHolidayMode} />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-orange-500 flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Current Study Streak</p>
                        <h2 className="text-4xl font-bold text-slate-800">{streak} <span className="text-xl font-medium text-slate-500">days</span></h2>
                    </div>
                    <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                        <IconFlame />
                    </div>
                </div>

                <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-blue-500 flex items-center justify-between transition-transform hover:-translate-y-1">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Next Upcoming Alarm</p>
                        <h2 className="text-3xl font-bold text-slate-800">
                            {holidayMode ? 'Paused' : (nextAlarm ? nextAlarm.time : 'None')}
                        </h2>
                        {nextAlarm && !holidayMode && <p className="text-sm text-blue-600 mt-1 font-medium">{nextAlarm.title}</p>}
                    </div>
                    <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center">
                        <IconClock />
                    </div>
                </div>
            </div>

            <main>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Scheduled Sessions</h2>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm"
                    >
                        <IconPlus /> Add Block
                    </button>
                </div>

                {schedules.length === 0 ? (
                    <div className="text-center py-16 glass-panel rounded-2xl border-dashed border-2 border-slate-300">
                        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IconClock />
                        </div>
                        <h3 className="text-lg font-medium text-slate-800 mb-2">No schedules yet</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">Create your first study block to start building your academic streak.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {schedules.map(schedule => (
                            <div key={schedule.id} className={`glass-panel rounded-xl p-5 flex items-center justify-between transition-all ${!schedule.enabled || holidayMode ? 'opacity-60' : 'hover:shadow-md'}`}>
                                <div className="flex items-center gap-6">
                                    <div className="w-20">
                                        <p className="text-2xl font-bold text-slate-800">{schedule.time}</p>
                                    </div>
                                    <div className="w-px h-10 bg-slate-200"></div>
                                    <div>
                                        <h3 className={`text-lg font-medium ${!schedule.enabled || holidayMode ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                            {schedule.title}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <ToggleSwitch 
                                        checked={schedule.enabled} 
                                        onChange={() => toggleSchedule(schedule.id)} 
                                        disabled={holidayMode}
                                    />
                                    <button 
                                        onClick={() => deleteSchedule(schedule.id)}
                                        className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                                        aria-label="Delete schedule"
                                    >
                                        <IconTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Add Schedule Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">New Study Session</h3>
                        <form onSubmit={handleAdd}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Session Title</label>
                                <input 
                                    type="text" 
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="e.g., Math Revision"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                                <input 
                                    type="time" 
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 py-2 px-4 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={!newTitle || !newTime}
                                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main App ---
function App() {
    const [onboarding, setOnboarding] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [holidayMode, setHolidayMode] = useState(false);
    const [streak, setStreak] = useState(0);
    const [lastSolvedDate, setLastSolvedDate] = useState("");
    
    const [activeAlarm, setActiveAlarm] = useState(null);
    const [showPuzzle, setShowPuzzle] = useState(false);
    
    const [isLoaded, setIsLoaded] = useState(false);

    // Load state
    useEffect(() => {
        try {
            const data = localStorage.getItem('scholarSyncData');
            if (data) {
                const parsed = JSON.parse(data);
                setOnboarding(parsed.onboarding || null);
                setSchedules(parsed.schedules || []);
                setHolidayMode(parsed.holidayMode || false);
                setStreak(parsed.streak || 0);
                setLastSolvedDate(parsed.lastSolvedDate || "");
            }
        } catch (e) {
            console.error("Failed to load local data", e);
        }
        setIsLoaded(true);
    }, []);

    // Save state
    useEffect(() => {
        if (!isLoaded) return;
        const data = { onboarding, schedules, holidayMode, streak, lastSolvedDate };
        localStorage.setItem('scholarSyncData', JSON.stringify(data));
    }, [onboarding, schedules, holidayMode, streak, lastSolvedDate, isLoaded]);

    // Alarm Engine Worker
    useEffect(() => {
        if (!isLoaded || holidayMode || showPuzzle || !onboarding) return;

        const interval = setInterval(() => {
            const now = new Date();
            const currentHours = now.getHours().toString().padStart(2, '0');
            const currentMinutes = now.getMinutes().toString().padStart(2, '0');
            const currentTimeStr = `${currentHours}:${currentMinutes}`;
            const todayStr = now.toISOString().split('T')[0];
            
            const triggered = schedules.find(s => 
                s.enabled && 
                s.time === currentTimeStr && 
                s.lastTriggeredDate !== todayStr
            );
            
            if (triggered) {
                // Update schedule to mark as triggered today
                setSchedules(prev => prev.map(sch => 
                    sch.id === triggered.id ? { ...sch, lastTriggeredDate: todayStr } : sch
                ));
                setActiveAlarm(triggered);
                setShowPuzzle(true);
                
                // Play notification sound if possible
                try {
                    // Using a simple beep tone created dynamically
                    const ctx = new (window.AudioContext || window.webkitAudioContext)();
                    const osc = ctx.createOscillator();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
                    osc.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.5);
                } catch (e) {
                    // Ignore audio context errors if not interacted with
                }
            }
        }, 1000 * 5); // Check every 5 seconds for precision

        return () => clearInterval(interval);
    }, [isLoaded, schedules, holidayMode, showPuzzle, onboarding]);

    if (!isLoaded) return null;

    return (
        <div className="relative overflow-hidden min-h-screen">
            {/* Subtle background gradients */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-slate-50">
                <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50 to-slate-50"></div>
            </div>

            {!onboarding ? (
                <OnboardingModal setOnboarding={setOnboarding} />
            ) : (
                <Dashboard 
                    schedules={schedules} 
                    setSchedules={setSchedules}
                    holidayMode={holidayMode}
                    setHolidayMode={setHolidayMode}
                    streak={streak}
                />
            )}
            
            {showPuzzle && activeAlarm && (
                <PuzzleModal 
                    onboarding={onboarding} 
                    scheduleTitle={activeAlarm.title}
                    onSolve={() => {
                        setShowPuzzle(false);
                        setActiveAlarm(null);
                        
                        // Handle streak update
                        const today = new Date().toISOString().split('T')[0];
                        if (lastSolvedDate !== today) {
                            setStreak(s => s + 1);
                            setLastSolvedDate(today);
                        }
                    }} 
                />
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
