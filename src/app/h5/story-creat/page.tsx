'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface StoryLocation {
  id: string;
  name: string;
  description: string;
  type: 'restaurant' | 'museum' | 'park' | 'shopping' | 'entertainment' | 'nature' | 'cafe' | 'landmark' | 'hotel' | 'viewpoint';
  coordinates: { x: number; y: number };
  emoji: string;
}

interface StorySurprise {
  id: string;
  name: string;
  description: string;
  type: 'npc' | 'treasure' | 'secret' | 'challenge' | 'reward';
  trigger: string;
  emoji: string;
}

interface StoryCollaborator {
  id: string;
  name: string;
  role: 'creator' | 'editor' | 'viewer';
  permissions: string[];
  avatar: string;
}

export default function StoryCreatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'menu' | 'creation'>('menu');
  const [storyData, setStoryData] = useState({
    title: '',
    description: '',
    type: 'adventure',
    locations: [] as StoryLocation[],
    surprises: [] as StorySurprise[],
    collaborators: [] as StoryCollaborator[]
  });

  const handleBackToHome = () => {
    router.push('/home');
  };

  const handleBackToMenu = () => {
    setCurrentStep('menu');
  };

  const startStoryCreation = () => {
    setCurrentStep('creation');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStoryDataChange = (field: string, value: any) => {
    setStoryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addLocation = () => {
    const newLocation: StoryLocation = {
      id: `loc_${Date.now()}`,
      name: '',
      description: '',
      type: 'landmark',
      coordinates: { x: 50, y: 50 },
      emoji: '📍'
    };
    setStoryData(prev => ({
      ...prev,
      locations: [...prev.locations, newLocation]
    }));
  };

  const addSurprise = () => {
    const newSurprise: StorySurprise = {
      id: `surprise_${Date.now()}`,
      name: '',
      description: '',
      type: 'npc',
      trigger: '',
      emoji: '🎭'
    };
    setStoryData(prev => ({
      ...prev,
      surprises: [...prev.surprises, newSurprise]
    }));
  };

  const addCollaborator = () => {
    const newCollaborator: StoryCollaborator = {
      id: `collab_${Date.now()}`,
      name: '',
      role: 'viewer',
      permissions: ['view'],
      avatar: '👤'
    };
    setStoryData(prev => ({
      ...prev,
      collaborators: [...prev.collaborators, newCollaborator]
    }));
  };

  const publishStory = () => {
    // Mock publishing logic
    console.log('Publishing story:', storyData);
    // Here you would typically send the data to your backend
    alert('Story published successfully!');
    router.push('/bookshelf');
  };

  const storyTypes = [
    { value: 'adventure', label: 'Adventure', emoji: '🏃‍♂️' },
    { value: 'romance', label: 'Romance', emoji: '💕' },
    { value: 'culture', label: 'Culture', emoji: '🏛️' },
    { value: 'food', label: 'Food', emoji: '🍜' },
    { value: 'nature', label: 'Nature', emoji: '🌲' },
    { value: 'history', label: 'History', emoji: '📚' }
  ];

  const locationTypes = [
    { value: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
    { value: 'museum', label: 'Museum', emoji: '🏛️' },
    { value: 'park', label: 'Park', emoji: '🌳' },
    { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
    { value: 'entertainment', label: 'Entertainment', emoji: '🎮' },
    { value: 'nature', label: 'Nature', emoji: '🏔️' },
    { value: 'cafe', label: 'Cafe', emoji: '☕' },
    { value: 'landmark', label: 'Landmark', emoji: '🗼' },
    { value: 'hotel', label: 'Hotel', emoji: '🏨' },
    { value: 'viewpoint', label: 'Viewpoint', emoji: '🌅' }
  ];

  const surpriseTypes = [
    { value: 'npc', label: 'NPC Interaction', emoji: '👤' },
    { value: 'treasure', label: 'Hidden Treasure', emoji: '💎' },
    { value: 'secret', label: 'Secret Passage', emoji: '🚪' },
    { value: 'challenge', label: 'Mini Challenge', emoji: '🎯' },
    { value: 'reward', label: 'Special Reward', emoji: '🏆' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#fe585f] to-[#ff7a80] p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={currentStep === 'menu' ? handleBackToHome : handleBackToMenu}
            className="text-white/90 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">Create Story</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {currentStep === 'menu' ? (
        /* Story Creation Menu */
        <div className="px-4 pb-20">
          <div className="space-y-4">
            {/* AI Story Builder */}
            <div className="bg-white shadow-lg rounded-3xl p-6 border border-slate-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">AI Story Builder</h3>
                <p className="text-slate-600 text-sm">Generate amazing stories based on your check-in records</p>
              </div>
              <button
                onClick={startStoryCreation}
                className="w-full bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white rounded-xl py-3 font-medium hover:shadow-lg transition-all"
              >
                🚀 Start Creating Story
              </button>
            </div>

            {/* Multi-Creator Collaboration */}
            <div className="bg-white shadow-lg rounded-3xl p-6 border border-slate-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Multi-Creator Collaboration</h3>
                <p className="text-slate-600 text-sm">Invite friends to create amazing stories together</p>
              </div>
              <button
                onClick={() => alert('Collaboration feature coming soon!')}
                className="w-full bg-slate-600 text-white rounded-xl py-3 font-medium hover:bg-slate-700 hover:shadow-lg transition-all"
              >
                👥 Invite Collaborators
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Story Creation Interface */
        <div className="px-4 pb-20">
          <div className="space-y-4">
            {/* Story Basic Info */}
            <div className="bg-white shadow-lg rounded-3xl p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">📝 Story Basic Info</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 text-sm font-medium mb-2">Story Title</label>
                  <input
                    type="text"
                    value={storyData.title}
                    onChange={(e) => handleStoryDataChange('title', e.target.value)}
                    placeholder="Give your story a name..."
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#fe585f]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-sm font-medium mb-2">Story Description</label>
                  <textarea
                    value={storyData.description}
                    onChange={(e) => handleStoryDataChange('description', e.target.value)}
                    placeholder="Describe your story theme and features..."
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#fe585f] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-sm font-medium mb-2">Story Type</label>
                  <select
                    value={storyData.type}
                    onChange={(e) => handleStoryDataChange('type', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#fe585f]"
                  >
                    {storyTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.emoji} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Locations Section */}
            <div className="bg-white shadow-lg rounded-3xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">📍 Add Locations</h3>
                <button
                  onClick={addLocation}
                  className="px-4 py-2 bg-gradient-to-r from-[#66D2A0] to-[#10B981] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
                >
                  + Add Location
                </button>
              </div>
              
              <div className="space-y-3">
                {storyData.locations.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    <div className="text-2xl mb-2">📍</div>
                    <p>No locations added yet</p>
                    <p className="text-sm">Add locations to create your story route</p>
                  </div>
                ) : (
                  storyData.locations.map((location, index) => (
                    <div key={location.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{location.emoji}</span>
                        <input
                          type="text"
                          value={location.name}
                          onChange={(e) => {
                            const newLocations = [...storyData.locations];
                            newLocations[index].name = e.target.value;
                            handleStoryDataChange('locations', newLocations);
                          }}
                          placeholder="Location name..."
                          className="flex-1 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#fe585f]"
                        />
                        <select
                          value={location.type}
                          onChange={(e) => {
                            const newLocations = [...storyData.locations];
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            newLocations[index].type = e.target.value as any;
                            newLocations[index].emoji = locationTypes.find(t => t.value === e.target.value)?.emoji || '📍';
                            handleStoryDataChange('locations', newLocations);
                          }}
                          className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#fe585f]"
                        >
                          {locationTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.emoji} {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <textarea
                        value={location.description}
                        onChange={(e) => {
                          const newLocations = [...storyData.locations];
                          newLocations[index].description = e.target.value;
                          handleStoryDataChange('locations', newLocations);
                        }}
                        placeholder="Describe this location..."
                        rows={2}
                        className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#fe585f] resize-none"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Surprises Section */}
            <div className="bg-white shadow-lg rounded-3xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">🎭 Add Surprises</h3>
                <button
                  onClick={addSurprise}
                  className="px-4 py-2 bg-gradient-to-r from-[#66D2A0] to-[#10B981] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
                >
                  + Add Surprise
                </button>
              </div>
              
              <div className="space-y-3">
                {storyData.surprises.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    <div className="text-2xl mb-2">🎭</div>
                    <p>No surprises added yet</p>
                    <p className="text-sm">Add surprises to make your story more exciting</p>
                  </div>
                ) : (
                  storyData.surprises.map((surprise, index) => (
                    <div key={surprise.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{surprise.emoji}</span>
                        <input
                          type="text"
                          value={surprise.name}
                          onChange={(e) => {
                            const newSurprises = [...storyData.surprises];
                            newSurprises[index].name = e.target.value;
                            handleStoryDataChange('surprises', newSurprises);
                          }}
                          placeholder="Surprise name..."
                          className="flex-1 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#fe585f]"
                        />
                        <select
                          value={surprise.type}
                          onChange={(e) => {
                            const newSurprises = [...storyData.surprises];
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            newSurprises[index].type = e.target.value as any;
                            newSurprises[index].emoji = surpriseTypes.find(t => t.value === e.target.value)?.emoji || '🎭';
                            handleStoryDataChange('surprises', newSurprises);
                          }}
                          className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#fe585f]"
                        >
                          {surpriseTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.emoji} {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <textarea
                        value={surprise.description}
                        onChange={(e) => {
                          const newSurprises = [...storyData.surprises];
                          newSurprises[index].description = e.target.value;
                          handleStoryDataChange('surprises', newSurprises);
                        }}
                        placeholder="Describe this surprise..."
                        rows={2}
                        className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#fe585f] resize-none"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Collaborators Section */}
            <div className="bg-white shadow-lg rounded-3xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">🤝 Invite Collaborators</h3>
                <button
                  onClick={addCollaborator}
                  className="px-4 py-2 bg-gradient-to-r from-[#66D2A0] to-[#10B981] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
                >
                  + Invite Friend
                </button>
              </div>
              
              <div className="space-y-3">
                {storyData.collaborators.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    <div className="text-2xl mb-2">🤝</div>
                    <p>No collaborators invited yet</p>
                    <p className="text-sm">Invite friends to create stories together</p>
                  </div>
                ) : (
                  storyData.collaborators.map((collaborator, index) => (
                    <div key={collaborator.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{collaborator.avatar}</span>
                        <input
                          type="text"
                          value={collaborator.name}
                          onChange={(e) => {
                            const newCollaborators = [...storyData.collaborators];
                            newCollaborators[index].name = e.target.value;
                            handleStoryDataChange('collaborators', newCollaborators);
                          }}
                          placeholder="Friend's name..."
                          className="flex-1 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#fe585f]"
                        />
                        <select
                          value={collaborator.role}
                          onChange={(e) => {
                            const newCollaborators = [...storyData.collaborators];
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            newCollaborators[index].role = e.target.value as any;
                            handleStoryDataChange('collaborators', newCollaborators);
                          }}
                          className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#fe585f]"
                        >
                          <option value="viewer">👁️ Viewer</option>
                          <option value="editor">✏️ Editor</option>
                          <option value="creator">👑 Creator</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Publish Button */}
            <button
              onClick={publishStory}
              className="w-full bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white rounded-xl py-4 font-bold text-lg hover:shadow-lg transition-all"
            >
              🚀 Publish Story
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
