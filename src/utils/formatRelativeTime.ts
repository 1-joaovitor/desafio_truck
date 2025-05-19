export  const formatRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Agora mesmo';
    if (diff < 3600000) return `Há ${Math.floor(diff / 60000)} minutos`;
    if (diff < 86400000) return `Há ${Math.floor(diff / 3600000)} horas`;
    if (diff < 604800000) return `Há ${Math.floor(diff / 86400000)} dias`;
    
    return new Date(timestamp).toLocaleDateString();
  };