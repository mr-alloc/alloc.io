---
layout: post
title: MySQL의 EXPLAIN을 알아보자
categories: [database, mysql]
tags: [Database, MySQL, EXPLAIN]
date: 2024-08-23 14:27:00 +0900
thumbnail: /post/database/mysql/mysql-explain-thumbnail.webp
current-company: NEOWIZ
current-position: Software Engineer
summary: MySQL EXPLAIN
excerpt-separator: <!--more-->
hide: false
---
MySQL의 쿼리실행계획에 대해 알아보자.
<!--more-->

회사에서는 신규유입되는 쿼리에 한에 검수할 수 있는 툴을 만들었다.

나는 담당하는 서비스에 대해 신규 유입 쿼리를 검수해야하며, 매우 많은 쿼리를 봐야만 했다. 
이는 반복적인 업무(쿼리 복사, 테이블 및 인덱스확인, 검수)로 이어졌으며, 실행계획만으로 분석해야하는 대상인지를 1차적으로 판단할 필요가있었다.

쿼리는 여러 유입 목록중 하나를 상세보기로 전체쿼리를 보아 DB Client(Datagrip)로 가져와서 한개씩 확인 해야했다. 
해당 목록에는 쿼리 실행계획도 포함이 되어있기때문에, 상세보기를 보지않고, 목록에서 실행계획만 본다면 바로 판단이 가능하다고 생각되어, 실행 계획을 공부하기로 했다.  

---

`EXPLAIN`은 MySQL이 statement를 어떻게 실행하는지에 대한 정보를 제공한다.
`EXPLAIN`은 `SELECT`쿼리 에서 사용되는 각 테이블에 대한 정보를 반환하며, 이는 [Mysql Query Optimizer]() 가 명령문을 처리하면서 읽는 순서대로 테이블을 나열한다. 
이 말은 MySQL이 첫번째 테이블에서 행을 읽고 두번째 테이블에서 매치되는 행을 찾은 다음, 세번째 테이블에서, 그리고 계속 그렇게 진행한다는 의미이다. 



## EXPLAIN 출력 컬럼::explain-output-columns

`EXPLAIN`의 각 출력 행은 하나의 테이블에 대한 정보를 제공한다. 각 행은  아래 `표 1.1 EXPLAIN 출력 컬럼들` 에 요약된 값을 포함한다.
테이블의 첫번째 컬럼에는 컬럼명, 두번째는 `FORMAT=JSON`이 사용될때 출력에서 보여지는 프로퍼티명을 제공한다.



*표 1.1 EXPLAIN 출력 컬럼들*

| 컬럼          | JSON 이름     | 의미                             |
| ------------- | ------------- | -------------------------------- |
| id            | select_id     | SELECT 식별자                    |
| select_type   | 없음          | SELECT 타입                      |
| table         | table_name    | 결과 행에 대한 테이블            |
| partitions    | partitions    | 매칭되는 파티션                  |
| type          | access_type   | JOIN 타입                        |
| possible_keys | possible_keys | 선택에 사용가능한 index들        |
| key           | key_length    | 선택된 키의 길이                 |
| ref           | ref           | index에 비교되는 컬럼들          |
| rows          | rows          | 조사될 예상행                    |
| filtered      | filtered      | 테이블 조건에서 걸러진 행의 비율 |
| extra         | 없음          | 추가 정보                        |



### id (SELECT 순서)::id
(JSON: selected_id)  
SELECT 식별자이다. 쿼리 내에서 SELECT의 순서가 있는 숫자이며,  다른 행의 `UNION` 결과를 행이 참조한다면 값은 null일 수 있다. 
이 경우 테이블 컬럼은 id 값들의 M과 N인 행의 `UNION`에 행이 참조하는 행을 나타내기 위해, <union**M**,**N**> 같은 값을 보여준다.
  

### select_type (SELECT 타입)::select-type   
(JSON: 없음)  
아래 보여진 테이블중 어떤 `SELECT`의 타입이다. JSON-formatted EXPLAIN은  `SIMPLE`이나 `PRIMARY`가 아닌 한  `query_block`의 프로퍼티로 SELECT 타입을 노출한다.

| select_type **값**   | JSON 이름                  | Meaning                                                      |
| -------------------- | -------------------------- | ------------------------------------------------------------ |
| SIMPLE               | 없음                       | 간단한 SELECT (UNION 또는 서브쿼리 사용 X)                   |
| PRIMARY              | 없음                       | 가장 바깥쪽 SELECT                                           |
| UNION                | 없음                       | UNION의 두번째 이상의 SELECT                                 |
| DEPENDENT UNION      | dependent (true)           | 바깥쪽 쿼리에 의존되는 UNION에서 두번째 이상의 SELECT        |
| UNION RESULT         | union_result               | UNION의 결과                                                 |
| SUBQUERY             | 없음                       | 서브쿼리의 첫번째 SELECT                                     |
| DEPENDENT SUBQUERY   | dependent (true)           | 바깥쪽 쿼리에 의존되는 서브쿼리의 첫번째 SELECT              |
| DERIVED              | 없음                       | 파생된 테이블 (서브쿼리로 만들어진 임시테이블)               |
| DEPENDENT DERIVED    | depentent (true)           | 또다른 테이블을 의존하는 파생된 테이블                       |
| MATERIALIZED         | materialized_from_subquery | 서브쿼리로 물질화                                            |
| UNCHAHEABLE SUBQUERY | cacheable (false)          | 바깥쪽 쿼리의 각  행에대해 결과가 캐시될수 없고 재 평가 되어아야하는 서브쿼리 |
| UNCACHEABLE UNION    | cacheable (false)          | 캐시를 할 수 없는 서브쿼리에 속해있는 UNION 내 두번째 이상 SELECT |

> `DEPENDENT`는 일반적으로 [상관관계 서브쿼리](https://dev.mysql.com/doc/refman/8.4/en/correlated-subqueries.html) 사용을 의미한다.
:{ "type": "note", "icon": "info"}

### table (참조 테이블)::table
(JSON: table_name)    
출력행이 참조하는 테이블명이며, 다음 값중 하나가 될 수도 있다.
* <union**M**, **N**>:  행은 **M** 과 **N**의 id 값을 갖는 행의 union을 합집합을 참조한다.
* <deribed**N**>: 행은 **N**의 값을 갖는 행에 대한 파생된 테이블의 결과를 참조한다.  파생된 테이블은 예를들어 `FROM`절 내 서브쿼리에서 생성될 수도 있다.
* <subquery**N**>: 행은 **N**의 id값을 갖는 행에대해 구체화된 서브쿼리(Materialized Subquery)의 결과를 참조한다.

### partition (파티션)::partition
(JSON: partitions)  
  쿼리로부터 매칭될수 있는 레코드에서의 파티션이다. 파티셔닝 되지않은 테이블에 대해서는 `NULL` 이다.

### type (조인타입)::type
(JSON: access_type)
조인 타입이며, 테이블들을 어떻게 조인하는지 설명을 출력한다. JSON-formatted 출력에서는 acess_type의 속성 값으로 나온다. 다음에 목록은 조인타입을 좋은 케이스부터 안좋은케이스 순으로 설명한다.
* system  
  테이블이 한개의 로우(= 시스템 테이블)만 가지고있다. `const` 조인타입의 특별한 케이스이다.
* const  
테이블에 매칭되는 행이 최대 한개만 있으며, 이는 쿼리의 시작시 읽힌다. 오직 한개의 행만 있기 때문인데, 이 행의 열에 있는 값은 옵티마이저의 나머지 부분에서 상수로 간주될 수 있다. `const` 테이블은 한번만 읽히므로 매우빠르다.
`const` 는`UNIQUE` 인덱스나 `PRIMARY KEY` 의 모든 부분을 상수값과 비교할때 시용된다.  다음 쿼리는  *tbl_name*이 상수 테이블로 사용될 수 있다.
```sql
SELECT * FROM tbl_name WHERE primary_key = 1;
  
SELECT * FROM tbl_name
    WHERE primary_key_part1 = 1 AND primary_key_part2 = 2;
```

* eq_ref  
이전 테이블에서 각 행 조합마다 이 테이블에서 한 행씩 읽는다. `system`과 `const` 타입을 제외하면 이게 제일 나은 조인타입이다.  조인에서 인덱스의 모든 부분을 사용하고,  인덱스가 `PRIMARY` 또는 `UNIQUE NOT NULL` 인덱스인 경우에 사용된다.
`eq_ref`는 `=` 연산자를 사용하여 비교된 컬럼  인덱스에 사용될 수있다. 비교값은 상수가 될수 있고, 이 테이블보다 먼저 읽은 테이블의 열을 사용하는 표현식이 될 수도 있다. 다음의 예제에서 MySQL 은 *ref_table*를 처리하기위해 `eq_ref` 조인을 사용 할 수 있다.
```sql
SELECT * FROM ref_table,other_table
  WHERE ref_table.key_column = other_table.column; //표현식 비교
  
SELECT * FROM ref_table, other_table
  WHERE ref_table.key_column_part1 = other_table.column
  AND ref_table.key_column_part2 = 1; //상수비교
```

* ref  
이전 테이블의 행조합마다 일치하는 인덱스 값이 있는 모든행이 이 테이블에서 읽혀진다. 키의 가장왼쪽 접두어만 조인에 사용되거나 키가 `PRIMARY KEY` 또는 `UNIQUE`인덱스(즉, 키 값을 기준으로 조인이 단일행을 선택할 수 없는 경우)가 아닌경우에 `ref`가 사용된다.
사용된 키가 몇개의 행에만 일치하는경우, 좋은 조인 타입이다.
`ref` 는 `<=>`또는 `=` 연산자를 사용하여 비교된 인덱스들에 대해 사용될 수 있다. 다음의 예제에서 MySQL은 *ref_table* 처리에 `ref` 조인을 사용할 수 있다.  
```sql
SELECT * FROM ref_table WHERE key_column = expr; //여기서 expr은 다른 테이블에 대한 조건 표현식을 의미한다.
  
SELECT * FROM ref_table, other_table
  WHERE ref_table.key_column = other_table.column;
  
SELECT * FROM ref_table,other_table
  WHERE ref_table.key_column_part1 = other_table.column
  AND ref_table.key_column_part2 = 1;
```
* fulltext  
`FULLTEXT` 인덱스를 사용하여 수행된 조인이다.

* ref_or_null  
이 조인 타입은 `ref` 와 유사하지만, MySQL이 `NULL` 값을 포함하는 행들에 대해 추가 검색 수행한다는 점이 다르다. 이 조인 타입 최적화는 서브쿼리를 해결하는데 가장 자주 사용된다. 다음의 예제에서 MySQL은 *ref_table*을 처리에 `ref_or_null` 조인을 사용할 수 있다.
```sql
SELECT * FROM ref_table
  WHERE key_column = expr OR key_column IS NULL;
```
* index_merge  
이 조인 타입은 인덱스 병합 최적화가 사용되었다는 것을 나타 낸다. 이 경우, 출력행의 `key` 컬럼은 사용된 인덱스들의 목록을 포함하며  `key_len` 은 사용된 인덱스에 대한 가장긴 키부분 목록을 포함한다.

* unique_subquery  
이 타입은 다음 형식의 `IN` 서브쿼리이 대한 `eq_ref`를 대체한다.
```sql
value IN (SELECT primary_key FROM single_table WHERE some_expr)
```
`unique_subquery`는 완전히 더나은 효율성을 위해 서브쿼리를 완전히 대체하는 인덱스 조회 함수일 뿐이다.

* index_subquery  
이 조인 타입은 `unique_subquery`와 비슷하다. `IN` 서브쿼리를 대체하지만, 다음의 형식의 서브쿼리에서 유니크가 아닌 인덱스에 대해 동작한다.
```sql
value IN (SELECT key_column FROM single_table WHERE some_expr)
```

* range  
주어진 범위에 있는 행들만 조회되며, 행 선택에 인덱스를 사용한다. 출력 행의 `key` 컬럼은 해당 인덱스가 사용됨을 나타낸다. `key_len` 컬럼은 사용된 가장긴 키부분을 포함한다. `ref`컬럼은 이 타입에대해 `NULL` 이다.
`range`는 `key`컬럼이  `=, <>, >, >=, <, <=, IS NULL, <=>, BETWEEN, LIKE` 또는  `IN()` 연산자를 사용하여 비교되는 상수일 때 사용된다.
```sql 
SELECT * FROM tbl_name
  WHERE key_column = 10;
  
SELECT * FROM tbl_name
  WHERE key_column BETWEEN 10 and 20;
  
SELECT * FROM tbl_name
  WHERE key_column IN (10, 20, 30);
  
SELECT * FROM tbl_name
  WHERE key_part1 = 10 AND key_part2 IN (10, 20, 30);
```
* index   
`index` 조인 타입은 인덱스 트리 스캔 빼고 `ALL` 하고 같으며, 두가지 상황에서 발생한다.
* 인덱스가 쿼리에 대한 커버링 인덱스 이고,  테이블에서 필요한 모든 데이터를 충족하는 데 사용할 수 있는 경우 인덱스 트리만 스캔된다. 이 경우 `Extra` 컬럼은 `Using Index`라고 나온다. 보통 인덱스 전용 스캔은 일반적으로 인덱스 사이즈가 테이블 데이터보다 작기떄문에, `ALL`보다 빠르다.
* 풀 스캔은 인덱스에서 읽어서 인덱스 순서대로 데이터 행을 조회하여 수행된다.  `Extra` 컬럼이 에는 인덱스 사용이 나오지 않는다.
MySQL은 쿼리가 단일인덱스의 일부인 컬럼만 사용하는 경우, 이 조인타입을 사용할 수있다.

* ALL  
풀스캔은 이전 테이블의 행 조합 마다 수행된다. 테이블이 `const`로 표시되지않은 첫번째 테이블인 경우 일반적으로 좋지 않으며, 다른 모든 경우에는 *매우* 나쁘다. 보통은, 이전테이블의 상수값 이나 컬럼값을 기준으로 테이블에서 행을 검색할 수있는 인덱스를 추가하면 `ALL` 타입을 피할 수 있다.

### possible_keys (사용가능한 인덱스)::possible-keys
(JSON: possible_keys)    
`possible_keys` 컬럼은 MySQL이 이 테이블에서 행을 찾기위해 선택할 수 있는 인덱스들을 나타낸다. 참고로 이 컬럼은 `EXPLAIN`의 출력에 표시된 테이블들의 순서와 별개입니다. 이 말은 테이블 순서 생성된 실행에서  `possible_keys`에 어떤 키들은 사용될수 없을 수도 있다는 의미이다.
이 컬럼이 `NULL`이라면, 적절한 인덱스가 없다는 뜻이다. 이 경우 인덱싱에 적합한 컬럼을 참조하는지 확인하기위해 `WHERE` 절을 검사사여 쿼리의 성능을 개선할 수 있다. 적절한 인덱스를 생성하고 `EXPLAIN` 쿼리를 확인해보자.
SHOW INDEX FROM  *table_name* 으로 테이블 인덱스를 볼수 있다.

### key (사용할 인덱스)::key
(JSON: key)  
`key`  컬럼은 MySQL이 사용하기로 정한 키(인덱스)를 나타냅니다. MySQL이 행조회에 `possible_keys` 인덱스들중 중 한개를 사용하기로 정했다면, 인덱스는 키값으로 나열된다.
`key` 는 `possible_keys` 값에 없는 인덱스를 지정할 수도 있다.  이는 `possible_keys` 인덱스중 어느행도 조회되는데 적합하지 않지만, 쿼리의 선택된 모든 컬럼이 다른 인덱스의 컬럼인경우 발생할 수 있다. 즉, 지정된 인덱스가 선택된 컬럼들을 포함하고 있기때문에, 어느행을 검색할지를 결정하는 데는 사용되지 않더라도 인덱스 스캔은 데이터 행 스캔보다 효율적이다. (*이 내용은 "커버링 인덱스"의 효율성에 대한 내용이다.*)
`InnoDB`의 경우 쿼리에서 기본키를 선택하더라도 보조 인덱스가 선택한 열을 포함할 수 있다. 이는 `InnoDB`가 각 보조인덱스에 기본 키 값을 저장하기 때문이다. `key`컬럼이 `NULL`이라면, `MySQL`은 쿼리를 보다 효율적으로 실행하는데 사용할 인덱스를 찾지 못한다.

`MySQL`이 `possible_keys` 컬럼 내 있는 인덱스를 강제로 사용하거나 무시하게 하려면, 쿼리에서 `FORCE_INDEX`, `USE_INDEX` 또는 `IGNORE_INDEX`를 사용하면 된다.

### key_len (키의 길이)::key-len
(JSON: key_length)    
`key_len` 컬럼은 `MySQL`이 사용하기로 결정한 키의 길이를 나타낸다. `key_len`의 값은 MySQL이 실제로 사용하는 복합키의 일부가 얼마나 되는지 확인 할수 있게 해준다. 
실제 표시되는 값은 사용된 키의 바이트 길이를 나타내여 사용하는 유니코드마다 다를수 있다. (*실제로 사용하는 복합키의 일부의 의미는 쿼리에 따라 첫번째 컬럼만 사용할 수도 있고, 두번째 컬럼까지 사용할 수 있다는 의미이다.*)
키 저장 포맷으로 인해, `NULL`이 될수 있는 컬럼의 키 길이는 `NOT NULL`인 컬럼의 길이보다 1이 크다. (*NULL을 구분할 비트가 추가되기 때문에*)

### ref (참조 값)::ref
(JSON: ref)
`ref`컬럼은 테이블에서 `key` 컬럼 내 어떤 컬럼이나 제약이 지정된 인덱스와 비교되었는지 보여줍니다.
값이 `func`라면, 사용된 값은 어떤 함수의 결과입니다. 어떤 함수인지 확인하려면, 확장된 `EXPLAIN`결과를 보기위해 `EXPLAIN`뒤에 `SHOW WARNINGS`를 사용하면 된다. 
함수는 실제로 산술 연산자 같은 연산자 일 수 있다.

### rows (검사 행 개수)::rows
(JSON: rows)    
`rows`  컬럼은 `MySQL`이 쿼리 실행 검사를 해야만 한다고 여기는 행들의 개수를 나타낸다. `InnoDB` 테이블의 경우, 이 값은 예측치이며, 항상 정확하지 않을 수도 있다.

### filtered (필터된 수치) ::filtered
(JSON: filtered)
`filtered` 컬럼은 테이블 조건으로 필터된 테이블 행들의 예상 백분률을 나타낸다. 
최대 값은 100이며, 이는 행의 필터링이 발생되지않음을 의미한다. 100에서 감소된 값은 필터링 양이 증가함을 나타낸다. 
`rows` 는 검된 행의 예상치를 보여주고`rows` × `filtered`는 다음 테이블로 조인된 행의 갯수를 보여준다. 예를들어, `rows`가 1000이고 `filtered`가 50.00(50%)라면, 다음 테이블로 조인된 행의 개수는 1000 × 50% = 500이다.

### Extra (추가적인 내용)::extra
(JSON: 없음)
이컬럼은  `MySQL`이 쿼리를 어떻게 해결하는지에 대한 추가적인 정보를 포함한다. 다른 값의 설명들은 `EXPLAIN` [Extra 정보]()을 보자.

`Extra`컬럼에 해당하는 단일 JSON 속성 값은 따로 없지만, 이 컬럼 내에서 발생될수 있는 값들은 JSON 속성이나 `message` 속성의 텍스트로 노출된다.
쿼리를 빠르게 만들고 싶다면, `Using filesort`와 `Using temporary`의 `Extra` 컬럼값을 조심하자. JSON 형식에서는 `using_filesort`와 `using_temporary_table` 값이 `true`와 같다.

* Zero limit  
쿼리에 `LIMIT 0`절이있고 어떤 행도 선택할 수 없는 경우이다.

* Using Where with pushed condition  
이 항목은 [NDB]() 테이블들에만 적용된다.

* Using Where  
`WHERE`절은 다음 테이블과 일치시킬 행이나 클라이언트에 보내낼 행을 제한하는데 사용된다.  
특별하게 테이블의 모든행을 가져오길 의도하거나 검사하려 하지 않는한, `Extra` 값이 `Using Where`이 아니고 테이블 조인 타입이 `ALL` 또는 `index`라면, 쿼리에 문제가 있을수 있다.  

`Using Where`은 직접적으로 대응되는 JSON 속성이 없고 `attached_condition` 속성은 사용되는 모든 `WHERE` 조건을 포함한다.

* Using temporary  
쿼리를 해결하기위해 `MySQL`은 결과를 보관하기위해 임시테이블을 생성할 필요가 있다. 이는 일반적으로 쿼리가 컬럼을 다르게 나열하는 `GROUP BY`와 `ORDER BY`절을 포함하면 발생한다.  

* Using sort_union(...), Using union(...), Using intersect(...)  
이런것들은 `index_merge` 조인타입에 대한 인덱스 스캔이 어떻게 병합되는지를 보여주는 특별한 알고리즘을 나타낸다.

* Using MRR  
테이블은 다중범위 읽기 최적화 전략을 사용하여 읽힌다.  

* Using join buffer (Block Nested Loop), Using join buffer (Batched Key Access), Using join buffer (hash join)  
이전 조인의 테이블은 조인버퍼로 부분적으로 읽히고, 그 행들은 버퍼에서 현재 테이블과 조인을 수행하는데 사용된다. 
(Block Nested Loop)는 Block Nested-Loop 알고리즘 사용을 나타내고,(Batched Key Access)는 Batched Key Access 알고리즘 사용을 나타내며 (hash join)은 해시조인 사용을 나타낸다.
즉 `EXPLAIN` 출력의 이전라인에 있는 테이블의 키가 버퍼에 저장되고, 일치하는 행은 `Using join buffter`가 나타나는 줄로 보여진 테이블에서 일괄적으로 가져온다.

* Using index for skip scan  
스캔 스킵에대한 인덱스를 나타낸다.

* using index for group-by  
`Using index` 테이블 접근 방법과 유사하며, `Using index for group-by`sms `MySQL`이 실제테이블에 추가적인 어떤 디스크 접근도 없이 `GROUP BY` 또는 `DISTINT` 쿼리의 모든 컬럼을 검색하는데 사용할수 있는 인덱스를 찾았다는 것을 나타낸다.
게다가, 각 그룹에대해 몇개의 인덱스 항목만 읽도록하는 가장 효융적인 방식으로 인덱스가 사용된다.

* Using index condition  
테이블은 인덱스 튜블을 접근하여 읽고 전체 테이블 행을 읽을것인지 결정하기위해 먼저 테스트한다. 이 방법의 경우, 인덱스 정보는 필수가 아닌한 전체 테이블 행을 읽는것을 연기("푸시다운")하는 데 사용된다.

* Using index  
실제 행을 읽기위한 추가적인 탐색 없이 인덱스트리에서 정보만을 사용하여 테이블에서 컬럼 정보를 가져온다. 이 전략은 단일 인덱스의 부분인 컬럼만 사용하는 쿼리일때 사용될 수 있다.
InnoDB에서 사용자정의 클러스터드 인덱스(기본키)를 가진 테이블인 경우, `Extra` 컬럼에 `Using index`가 없더라도 해당 인덱스가 사용될 수 있다. 이는 `type`이 인덱스와 `key`가 `PRIMARY`인 경우에 해당한다.
사용된 커버링 인덱스에 대한 정보는 `EXPLAIN FORMAT=TRADITIONAL`과 `EXPLAIN FORMAT=JSON`에 대해 보여진다.

* Using filesort  
`MySQL`은 정렬된 순서로 행을 검색하는 방법을 찾기위해 한번 더 데이터를 훑어야 한다.
정렬은 조인타입에 따라 모든 행을 검토하면서 `WHERE`절과 일치하는 모든 행에 대해 행을 가리키는 포인터와 정렬키를 저장하는 방식으로 수행된 다음 키들이 정렬되고 정렬된 순서로 행들을 가져온다.
