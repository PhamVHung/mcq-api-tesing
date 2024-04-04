create database if not exists test_api;

use test_api;

create table if not exists users
(
    UserID     varchar(20)                                 not null
        primary key,
    Email      varchar(100)                                not null,
    Username   varchar(50)                                 not null,
    LastName   varchar(100)                                not null,
    MiddleName varchar(100)                                not null,
    FirstName  varchar(100)                                not null,
    Password   varchar(100)                                not null,
    Privilege  enum ('student', 'admin') default 'student' null,
    constraint Email
        unique (Email),
    constraint Username
        unique (Username)
);

create table if not exists tests
(
    TestID    varchar(20)  not null
        primary key,
    TestName  varchar(100) not null,
    StartTime datetime     not null,
    EndTime   datetime     not null,
    CreatedBy varchar(20)  not null,
    constraint FK_Tests_CreatedBy
        foreign key (CreatedBy) references users (UserID)
            on delete cascade
);

create table if not exists questions
(
    QuestionID   varchar(20) not null
        primary key,
    TestID       varchar(20) null,
    QuestionText text        not null,
    constraint FK_Questions_TestID
        foreign key (TestID) references tests (TestID)
            on delete cascade
);

create table if not exists answers
(
    AnswerID   varchar(20)          not null,
    QuestionID varchar(20)          not null,
    AnswerText text                 not null,
    IsCorrect  tinyint(1) default 0 not null,
    primary key (AnswerID, QuestionID),
    constraint FK_Answers_QuestionID
        foreign key (QuestionID) references questions (QuestionID)
            on delete cascade
);

create table if not exists testquestions
(
    TestQuestionID varchar(20)   not null
        primary key,
    TestID         varchar(20)   not null,
    QuestionID     varchar(20)   not null,
    QuestionOrder  int default 1 null,
    constraint FK_TestQuestions_QuestionID
        foreign key (QuestionID) references questions (QuestionID)
            on delete cascade,
    constraint FK_TestQuestions_TestID
        foreign key (TestID) references tests (TestID)
            on delete cascade
);

create table if not exists userresponses
(
    ResponseID varchar(20) not null
        primary key,
    UserID     varchar(20) null,
    TestID     varchar(20) null,
    QuestionID varchar(20) null,
    AnswerID   varchar(20) null,
    constraint FK_UserResponses_AnswerID
        foreign key (AnswerID, QuestionID) references answers (AnswerID, QuestionID)
            on delete cascade,
    constraint FK_UserResponses_QuestionID
        foreign key (QuestionID) references questions (QuestionID)
            on delete cascade,
    constraint FK_UserResponses_TestID
        foreign key (TestID) references tests (TestID)
            on delete cascade,
    constraint FK_UserResponses_UserID
        foreign key (UserID) references users (UserID)
            on delete cascade
);

create table if not exists userscores
(
    UserScoreID varchar(20)   not null
        primary key,
    UserID      varchar(20)   not null,
    TestID      varchar(20)   not null,
    Score       int default 0 null,
    constraint FK_UserScores_TestID
        foreign key (TestID) references tests (TestID)
            on delete cascade,
    constraint FK_UserScores_UserID
        foreign key (UserID) references users (UserID)
            on delete cascade
);

create table if not exists usertesthistory
(
    UserTestHistoryID varchar(20)                                                            not null
        primary key,
    UserID            varchar(20)                                                            not null,
    TestID            varchar(20)                                                            not null,
    Status            enum ('Completed', 'In Progress', 'Not Started') default 'Not Started' null,
    StartTime         datetime                                                               null,
    EndTime           datetime                                                               null,
    constraint FK_UserTestHistory_TestID
        foreign key (TestID) references tests (TestID)
            on delete cascade,
    constraint FK_UserTestHistory_UserID
        foreign key (UserID) references users (UserID)
            on delete cascade
);
