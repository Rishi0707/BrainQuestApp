// This is a sample of quiz data - replace with your actual quiz data
export default function handler(req, res) {
  res.status(200).json({
    questions: [
      {
        description: "What is DNA?",
        options: [
          {
            description: "Deoxyribonucleic acid",
            is_correct: true
          },
          {
            description: "Dihydroxy acid",
            is_correct: false
          },
          {
            description: "Dioxynucleic acid",
            is_correct: false
          },
          {
            description: "Dinucleic acid",
            is_correct: false
          }
        ]
      },
      // Add more questions here...
    ]
  });
} 