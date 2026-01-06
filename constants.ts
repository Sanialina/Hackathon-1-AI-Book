import { Module } from './types';

export const BOOK_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Module 1: Introduction to Physical AI',
    chapters: [
      { id: 'c1', title: 'Chapter 1: Introduction to Physical AI' },
      { id: 'c2', title: 'Chapter 2: Sensor Systems for Physical AI' },
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: ROS 2 – Robotic Nervous System',
    chapters: [
      { id: 'c3', title: 'Chapter 3: The Robotic Nervous System — ROS 2' },
      { id: 'c4', title: 'Chapter 4: Controlling Robots with Python and ROS 2' },
      { id: 'c5', title: 'Chapter 5: Describing Robots — URDF & SDF' },
    ]
  },
  {
    id: 'm3',
    title: 'Module 3: Simulation & Digital Twin',
    chapters: [
      { id: 'c6', title: 'Chapter 6: The Digital Twin Concept' },
      { id: 'c7', title: 'Chapter 7: Robot Simulation with Gazebo' },
      { id: 'c8', title: 'Chapter 8: High-Fidelity Simulation with Unity' },
    ]
  },
  {
    id: 'm4',
    title: 'Module 4: AI Robot Brain',
    chapters: [
      { id: 'c9', title: 'Chapter 9: NVIDIA Isaac Platform Overview' },
      { id: 'c10', title: 'Chapter 10: Perception and Mapping with Isaac ROS' },
      { id: 'c11', title: 'Chapter 11: Path Planning and Navigation (Nav2)' },
      { id: 'c12', title: 'Chapter 12: Learning to Move — Reinforcement Learning' },
    ]
  },
  {
    id: 'm5',
    title: 'Module 5: Vision-Language-Action',
    chapters: [
      { id: 'c13', title: 'Chapter 13: Vision–Language–Action (VLA)' },
      { id: 'c14', title: 'Chapter 14: Voice-to-Action Systems' },
      { id: 'c15', title: 'Chapter 15: Conversational Robotics' },
    ]
  },
  {
    id: 'm6',
    title: 'Module 6: Capstone',
    chapters: [
      { id: 'c16', title: 'Chapter 16: Capstone Project — The Autonomous Humanoid' },
      { id: 'c17', title: 'Chapter 17: From Simulation to the Real World' },
    ]
  },
];
