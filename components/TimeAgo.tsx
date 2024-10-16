import React, { useMemo } from 'react';

interface TimeAgoProps {
    dateString: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ dateString }) => {
    const getTimeAgo = (dateString: string) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) return `${interval} y`;
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return `${interval} m`;
        interval = Math.floor(seconds / 86400);
        if (interval > 1) return `${interval} d`;
        interval = Math.floor(seconds / 3600);
        if (interval > 1) return `${interval} h`;
        interval = Math.floor(seconds / 60);
        if (interval > 1) return `${interval} min`;
        return `Just now`;
    };

   
    const timeAgo = useMemo(() => getTimeAgo(dateString), [dateString]);

    return <span>{timeAgo}</span>;
};

export default TimeAgo;
